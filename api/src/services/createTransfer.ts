import {
  APIResponse,
  User,
  Account,
  Extract,
  DepositBody,
  WithdrawBody,
  TransferBody,
} from "../models";
import { ExceptionTreatment } from "../utils";
import {
  AccountDataValidator,
  WithdrawBodyValidator,
  DepositBodyValidator,
  TransferBodyValidator,
} from "../validators";

import { UsersTable } from "../clients/dao/postgres/users";
import { AccountsTable } from "../clients/dao/postgres/accounts";
import { TransationsTable } from "../clients/dao/postgres/transations";
import { v4 } from "uuid";

class CreateTransferService {
  private withdrawBodyValidator = WithdrawBodyValidator;
  private depositBodyValidator = DepositBodyValidator;
  private transferBodyValidator = TransferBodyValidator;

  private usersTable = UsersTable;
  private transationsTable = TransationsTable;
  private accountsTable = AccountsTable;

  public async execute(datas: TransferBody): Promise<APIResponse> {
    console.log("entrou");
    try {
      const validUserData = new this.transferBodyValidator(datas);
      if (validUserData.errors) {
        throw new Error(`400: ${validUserData.errors}`);
      }

      const verifyUserOriginExists =
        await new this.usersTable().selectForPassword(
          validUserData.userOrigin.cpf as string,
          validUserData.accountOrigin.password as string
        );
      if (!verifyUserOriginExists) {
        throw new Error(`400: usuário de origem não existe`);
      }
      const verifyUserReceiverExists = await new this.usersTable().select(
        validUserData.userReceiver.cpf as string
      );
      if (!verifyUserReceiverExists) {
        throw new Error(`400: usuário de destino não existe`);
      }

      const verifyAccountOriginExists = await new this.accountsTable().select(
        validUserData.accountOrigin.accountNumber,
        validUserData.accountOrigin.verificationAccountDigit,
        validUserData.accountOrigin.agency,
        validUserData.accountOrigin.verificationAgencyDigit
      );
      if (!verifyAccountOriginExists) {
        throw new Error(`400: conta de origem não existe`);
      }
      if (verifyUserOriginExists.id !== verifyAccountOriginExists.user_id) {
        throw new Error(`400: esta conta não pertence a este usuário`);
      }

      const verifyAccountReceiverExists = await new this.accountsTable().select(
        validUserData.accountReceiver.accountNumber,
        validUserData.accountReceiver.verificationAccountDigit,
        validUserData.accountReceiver.agency,
        validUserData.accountReceiver.verificationAgencyDigit
      );
      if (!verifyAccountReceiverExists) {
        throw new Error(`400: conta de destino não existe`);
      }
      if (verifyUserReceiverExists.id !== verifyAccountReceiverExists.user_id) {
        throw new Error(`400: esta conta não pertence a este usuário`);
      }
      if (verifyUserReceiverExists.id === verifyAccountReceiverExists.id) {
        throw new Error(
          `400: a conta de destino não pode ser a mesma da origem`
        );
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
        verifyAccountOriginExists.id
      );
      if (!withdrawIdOrigin) {
        throw new Error(`400: usuário de origem não existe`);
      }
      if (
        Number(validUserData.transfer.value) + 1 >
        Number(withdrawIdOrigin.balance)
      ) {
        throw new Error(`400: saldo insuficente`);
      }
      const depositIdReceiver = await new this.accountsTable().selectforId(
        verifyAccountOriginExists.id
      );
      if (!depositIdReceiver) {
        throw new Error(`400: usuário de destino não existe`);
      }

      const transferTransation = await new this.transationsTable().insert({
        id: v4(),
        date: currentDate,
        value: validUserData.transfer.value,
        type: "transfer",
        originId: verifyAccountOriginExists.id,
        receiverId: verifyAccountReceiverExists.id,
      });
      console.log(transferTransation);

      /* --------------- */

      const updateBalanceOrigin = await new this.accountsTable().updateBalance(
        verifyAccountOriginExists.id,
        Number(withdrawIdOrigin.balance) - Number(transferTransation.value - 1)
      );
      const updateBalanceReceiver =
        await new this.accountsTable().updateBalance(
          verifyAccountReceiverExists.id,
          Number(withdrawIdOrigin.balance) + Number(transferTransation.value)
        );

      const transferTransationRate = await new this.transationsTable().insert({
        id: v4(),
        date: `${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}`,
        value: 1,
        type: "T-rate",
        originId: verifyAccountOriginExists.id,
        receiverId: "6947a6c4-c467-45f8-afbe-5a522e5a850f",
      });
      const withdrawIdReceiverBank = await new this.accountsTable().selectforId(
        "6947a6c4-c467-45f8-afbe-5a522e5a850f"
      );
      const updateBalanceBank = await new this.accountsTable().updateBalance(
        "6947a6c4-c467-45f8-afbe-5a522e5a850f",
        Number(withdrawIdReceiverBank.balance) +
          Number(transferTransationRate.value)
      );
      console.log(updateBalanceBank);
      return {
        data: {
          id: transferTransation.id,
          type: transferTransation.type,
          value: transferTransation.value,
          rate: transferTransationRate.value,
          date: currentDate,
          origin: {
            agencyNumber: verifyAccountOriginExists.agency_number,
            agencyVerificationCode:
              verifyAccountOriginExists.agency_verification_code,
            accountNumber: verifyAccountOriginExists.account_number,
            accountVerificationCode:
              verifyAccountOriginExists.account_verification_code,
            document: verifyUserOriginExists.document,
          },
          receiver: {
            agencyNumber: verifyAccountReceiverExists.agency_number,
            agencyVerificationCode:
              verifyAccountReceiverExists.agency_verification_code,
            accountNumber: verifyAccountReceiverExists.account_number,
            accountVerificationCode:
              verifyAccountReceiverExists.account_verification_code,
            document: verifyUserReceiverExists.document,
          },
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

export { CreateTransferService };
