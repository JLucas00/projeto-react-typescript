import {
  APIResponse,
  User,
  Account,
  Extract,
  DepositBody,
  WithdrawBody,
} from "../models";
import { ExceptionTreatment } from "../utils";
import { AccountDataValidator, WithdrawBodyValidator } from "../validators";

import { UsersTable } from "../clients/dao/postgres/users";
import { AccountsTable } from "../clients/dao/postgres/accounts";
import { TransationsTable } from "../clients/dao/postgres/transations";
import { v4 } from "uuid";

class CreateWithDrawService {
  private withdrawBodyValidator = WithdrawBodyValidator;

  private usersTable = UsersTable;
  private transationsTable = TransationsTable;
  private accountsTable = AccountsTable;

  public async execute(datas: WithdrawBody): Promise<APIResponse> {
    console.log("entrou");
    try {
      const validUserData = new this.withdrawBodyValidator(datas);
      if (validUserData.errors) {
        throw new Error(`400: ${validUserData.errors}`);
      }

      const verifyUserExists = await new this.usersTable().selectForPassword(
        validUserData.user.cpf as string,
        validUserData.account.password as string
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

      const withdrawIdOrigin = await new this.accountsTable().selectforId(
        verifyAccountExists.id
      );
      if (!withdrawIdOrigin) {
        throw new Error(`400: usuário de destino não existe`);
      }

      if (
        Number(validUserData.withdraw.value) + 4 >
        Number(withdrawIdOrigin.balance)
      ) {
        throw new Error(`400: saldo insuficente`);
      }

      const updateBalance = await new this.accountsTable().updateBalance(
        verifyAccountExists.id,
        Number(withdrawIdOrigin.balance) -
          Number(validUserData.withdraw.value - 4)
      );

      const withdrawTransation = await new this.transationsTable().insert({
        id: v4(),
        date: currentDate,
        value: validUserData.withdraw.value,
        type: "withdraw",
        originId: verifyAccountExists.id,
        receiverId: null,
      });
      console.log(withdrawTransation);

      const withdrawTransationRate = await new this.transationsTable().insert({
        id: v4(),
        date: `${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}`,
        value: 4,
        type: "W-rate",
        originId: verifyAccountExists.id,
        receiverId: "6947a6c4-c467-45f8-afbe-5a522e5a850f",
      });
      const withdrawIdReceiverBank = await new this.accountsTable().selectforId(
        "6947a6c4-c467-45f8-afbe-5a522e5a850f"
      );
      const updateBalanceBank = await new this.accountsTable().updateBalance(
        "6947a6c4-c467-45f8-afbe-5a522e5a850f",
        Number(withdrawIdReceiverBank.balance) +
          Number(withdrawTransationRate.value)
      );
      console.log(updateBalanceBank);
      return {
        data: {
          id: withdrawTransation.id,
          type: withdrawTransation.type,
          agencyNumber: verifyAccountExists.agency_number,
          agencyVerificationCode: verifyAccountExists.agency_verification_code,
          accountNumber: verifyAccountExists.account_number,
          accountVerificationCode:
            verifyAccountExists.account_verification_code,
          document: verifyUserExists.document,
          value: withdrawTransation.value,
          rate: withdrawTransationRate.value,
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

export { CreateWithDrawService };
