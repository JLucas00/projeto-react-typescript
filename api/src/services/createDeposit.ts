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

      const transationDay = new Date().getDate();
      const transationMonth = new Date().getMonth() + 1;
      const transationYear = new Date().getFullYear();
      const currentDate = `${
        transationYear < 10 ? "0" + transationYear : transationYear
      }/${transationMonth < 10 ? "0" + transationMonth : transationMonth}/${
        transationDay < 10 ? "0" + transationDay : transationDay
      }`;

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

      const DepositTransationRate = await new this.transationsTable().insert({
        id: v4(),
        date: `${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}`,
        value: validUserData.deposit.value * 0.01,
        type: "D-rate",
        originId: verifyAccountExists.id,
        receiverId: "6947a6c4-c467-45f8-afbe-5a522e5a850f",
      });
      const depositIdReceiverBank = await new this.accountsTable().selectforId(
        "6947a6c4-c467-45f8-afbe-5a522e5a850f"
      );
      const updateBalanceBank = await new this.accountsTable().updateBalance(
        "6947a6c4-c467-45f8-afbe-5a522e5a850f",
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
