import { APIResponse, User, Account, Extract, DepositBody } from "../models";
import { ExceptionTreatment } from "../utils";
import { AccountDataValidator, DepositBodyValidator } from "../validators";

import { UsersTable } from "../clients/dao/postgres/users";
import { AccountsTable } from "../clients/dao/postgres/accounts";
import { TransationsTable } from "../clients/dao/postgres/transations";
import { v4 } from "uuid";

class CreateDepositService {
  private depositBodyValidator = DepositBodyValidator;

  private usersTable = UsersTable;
  private transationsTable = TransationsTable;
  private accountsTable = AccountsTable;

  public async execute(datas: DepositBody): Promise<APIResponse> {
    try {
      const validUserData = new this.depositBodyValidator(datas);
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
      if (verifyUserExists.id !== verifyAccountExists.user_id) {
        throw new Error(`400: esta conta não pertence a este usuário`);
      }

      const currentDate = new Date().toLocaleString();

      const DepositTransation = await new this.transationsTable().insert({
        id: v4(),
        date: currentDate,
        value: validUserData.deposit.value * 0.99,
        type: "deposit",
        originId: null,
        receiverId: verifyAccountExists.id,
      });
      console.log(DepositTransation);
      const depositIdReceiver = await new this.accountsTable().selectforId(
        verifyAccountExists.id
      );
      if (!depositIdReceiver) {
        throw new Error(`400: usuário de destino não existe`);
      }
      const updateBalance = await new this.accountsTable().updateBalance(
        verifyAccountExists.id,
        Number(depositIdReceiver.balance) + Number(DepositTransation.value)
      );
      console.log(updateBalance);
      const DepositTransationRate = await new this.transationsTable().insert({
        id: v4(),
        date: new Date().toLocaleString(),
        value: validUserData.deposit.value * 0.01,
        type: "D-rate",
        originId: verifyAccountExists.id,
        receiverId: "0567b44f-24f4-4dd6-bf35-1e0d2564ab3c",
      });
      const depositIdReceiverBank = await new this.accountsTable().selectforId(
        "0567b44f-24f4-4dd6-bf35-1e0d2564ab3c"
      );
      const updateBalanceBank = await new this.accountsTable().updateBalance(
        "0567b44f-24f4-4dd6-bf35-1e0d2564ab3c",
        Number(depositIdReceiverBank.balance) +
          Number(DepositTransationRate.value)
      );
      console.log(updateBalanceBank);
      return {
        data: {
          id: DepositTransation.id,
          type: DepositTransation.type,
          agencyNumber: verifyAccountExists.agency_number,
          agencyVerificationCode: verifyAccountExists.agency_verification_code,
          accountNumber: verifyAccountExists.account_number,
          accountVerificationCode:
            verifyAccountExists.account_verification_code,
          document: verifyUserExists.document,
          value: DepositTransation.value,
          rate: DepositTransationRate.value,
          date: currentDate,
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

export { CreateDepositService };
