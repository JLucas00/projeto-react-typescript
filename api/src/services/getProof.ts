import { APIResponse, User, Account, Extract, TransationId } from "../models";
import { ExceptionTreatment } from "../utils";
import {
  AccountDataValidator,
  ExtractDataValidator,
  TransationIdValidator,
} from "../validators";

import { UsersTable } from "../clients/dao/postgres/users";
import { AccountsTable } from "../clients/dao/postgres/accounts";
import { TransationsTable } from "../clients/dao/postgres/transations";

class GetProofService {
  private transationIdValidator = TransationIdValidator;

  private usersTable = UsersTable;
  private transationsTable = TransationsTable;
  private accountsTable = AccountsTable;

  public async execute(datas: TransationId): Promise<APIResponse> {
    try {
      const validId = new this.transationIdValidator(datas.id);

      if (validId.errors) {
        throw new Error(`400: ${validId.errors}`);
      }

      const verifyIdExists = await new this.transationsTable().select(
        validId.id as string
      );
      if (!verifyIdExists) {
        throw new Error(`400: transação não existe`);
      }
      verifyIdExists.value = Number(verifyIdExists.value);

      if (verifyIdExists.type === "transfer") {
        const originAccount = await new this.accountsTable().selectforId(
          verifyIdExists.origin_account_id as string
        );

        const destinationAccount = await new this.accountsTable().selectforId(
          verifyIdExists.destination_account_id as string
        );

        const originUser = await new this.usersTable().selectforId(
          originAccount.user_id as string
        );
        const destinationUser = await new this.usersTable().selectforId(
          destinationAccount.user_id as string
        );
        delete originAccount.id;
        delete originAccount.balance;
        delete originAccount.user_id;

        delete destinationAccount.id;
        delete destinationAccount.balance;
        delete destinationAccount.user_id;

        delete verifyIdExists.origin_account_id;
        delete verifyIdExists.destination_account_id;

        verifyIdExists.origin = originAccount;
        verifyIdExists.origin.user_name = originUser.name;
        verifyIdExists.destination = destinationAccount;
        verifyIdExists.destination.user_name = destinationUser.name;
      } else {
        delete verifyIdExists.origin_account_id;
        delete verifyIdExists.destination_account_id;
      }

      return {
        data: verifyIdExists,
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

export { GetProofService };
