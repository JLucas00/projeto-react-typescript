import { APIResponse, User, Account } from "../models";
import { ExceptionTreatment } from "../utils";
import { AccountDataValidator } from "../validators";

import { UsersTable } from "../clients/dao/postgres/users";
import { AccountsTable } from "../clients/dao/postgres/accounts";
import { v4 } from "uuid";

class CreateAccountService {
  private accountDataValidator = AccountDataValidator;

  private usersTable = UsersTable;
  private accountsTable = AccountsTable;

  private generateAccount(userId: string) {
    const userid = userId;
    const accountId = v4();
    const agencyNumber = `${Math.floor(Math.random() * 9999)}`;
    const agencyCode = `${Math.floor(Math.random() * 9)}`;
    const accountNumber = `${Math.floor(Math.random() * 999999)}`;
    const accountcode = `${Math.floor(Math.random() * 9)}`;
    const accountbalance = 0;
    return {
      agency: agencyNumber,
      verificationAgencyDigit: agencyCode,
      accountNumber: accountNumber,
      verificationAccountDigit: accountcode,
      balance: accountbalance,
      id: accountId,
      userId: userid,
    };
  }

  public async execute(user: User): Promise<APIResponse> {
    try {
      const validUserData = new this.accountDataValidator(user);

      if (validUserData.errors) {
        throw new Error(`400: ${validUserData.errors}`);
      }

      const verifyUserExists = await new this.usersTable().select(
        validUserData.user.cpf as string
      );
      if (verifyUserExists) {
        const account = this.generateAccount(verifyUserExists.id);
        const createAccount = await new this.accountsTable().insert(
          account as Account
        );
        console.log(account);
        if (createAccount) {
          return {
            data: account,
            messages: [],
          } as APIResponse;
        }
      } else {
        validUserData.user.id = v4();
        const insertedUser = await new this.usersTable().insert(
          validUserData.user as User
        );
        const account = this.generateAccount(verifyUserExists.id);
        const createAccount = await new this.accountsTable().insert(
          account as Account
        );

        if (createAccount) {
          return {
            data: account,
            messages: [],
          } as APIResponse;
        }
      }

      return {
        data: {},
        messages: ["an error occurred while creating user"],
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

export { CreateAccountService };
