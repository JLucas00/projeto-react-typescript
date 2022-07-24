import { APIResponse, User, Account, Extract } from "../models";
import { ExceptionTreatment } from "../utils";
import { AccountDataValidator, ExtractDataValidator } from "../validators";

import { UsersTable } from "../clients/dao/postgres/users";
import { AccountsTable } from "../clients/dao/postgres/accounts";
import { TransationsTable } from "../clients/dao/postgres/transations";

class GetExtractService {
  private extractDataValidator = ExtractDataValidator;

  private usersTable = UsersTable;
  private transationsTable = TransationsTable;
  private accountsTable = AccountsTable;

  public async execute(datas: Extract): Promise<APIResponse> {
    try {
      const validUserData = new this.extractDataValidator(datas);

      if (validUserData.errors) {
        throw new Error(`400: ${validUserData.errors}`);
      }

      const verifyUserExists = await new this.usersTable().select(
        validUserData.user.cpf as string
      );

      if (!verifyUserExists) {
        throw new Error(`400: usuário não existe`);
      }

      const verifyAccountExists = await new this.accountsTable().select(
        validUserData.account.accountNumber,
        validUserData.account.verificationAccountDigit,
        validUserData.account.agency,
        validUserData.account.verificationAgencyDigit
      );
      if (!verifyAccountExists) {
        throw new Error(`400: conta não existe`);
      }

      const transations = await new this.transationsTable().extract(
        verifyAccountExists.id
      );

      return {
        data: {
          agencyNumber: verifyAccountExists.agency_number,
          agencyVerificationCode: verifyAccountExists.agency_verification_code,
          accountNumber: verifyAccountExists.account_number,
          accountVerificationCode:
            verifyAccountExists.account_verification_code,
          owner: verifyUserExists.name,
          document: verifyUserExists.document,
          birthdate: verifyUserExists.birthdate,
          balance: verifyAccountExists.balance,
          transations: transations,
        },
        messages: [],
      } as APIResponse;
    } catch (error) {
      throw new ExceptionTreatment(
        error as Error,
        500,
        "an error occurred while inserting user on database"
      );
    }
  }
}

export { GetExtractService };
