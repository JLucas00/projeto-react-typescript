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
      const accounts = await new this.accountsTable().selectAll();
      const users = await new this.usersTable().selectAll();

      const accountUsers = users?.map((item) => {
        return {
          user: item,
          accounts: accounts?.filter((el) => {
            return el.user_id === item.id;
          }),
        };
      });

      function verifyUserAccount(account: any) {
        const verify: any = accountUsers?.filter((item) => {
          return (
            item.accounts?.filter((element) => {
              return element.id === account;
            }).length !== 0
          );
        });
        return verify[0];
      }

      const trasationsFormated = transations.map((item: any) => {
        return {
          origin_account_id: verifyUserAccount(item.origin_account_id),
          destination_account_id: verifyUserAccount(
            item.destination_account_id
          ),
          ...item,
        };
      });

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
          balance: Number(verifyAccountExists.balance),
          transations: trasationsFormated,
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
