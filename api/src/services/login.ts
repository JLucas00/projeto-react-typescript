import { APIResponse, User, Account, Extract, Login } from "../models";
import { ExceptionTreatment } from "../utils";
import { AccountDataValidator, LoginValidator } from "../validators";

import { UsersTable } from "../clients/dao/postgres/users";
import { AccountsTable } from "../clients/dao/postgres/accounts";
import { TransationsTable } from "../clients/dao/postgres/transations";

class LoginService {
  private loginValidator = LoginValidator;

  private usersTable = UsersTable;
  private transationsTable = TransationsTable;
  private accountsTable = AccountsTable;

  public async execute(datas: Login): Promise<APIResponse> {
    try {
      const validUserData = new this.loginValidator(datas);

      if (validUserData.errors) {
        throw new Error(`400: ${validUserData.errors}`);
      }

      const verifyUserExists = await new this.usersTable().selectForPassword(
        validUserData.login.cpf as string,
        validUserData.login.password as string
      );

      if (
        !verifyUserExists ||
        verifyUserExists === [] ||
        verifyUserExists === null
      ) {
        throw new Error(`400: usuário incorreto`);
      }

      const accounts = await new this.accountsTable().selectforUserId(
        verifyUserExists.id
      );

      const dataUser = {
        user: verifyUserExists,
        accounts: accounts,
      };

      return {
        data: dataUser,
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

export { LoginService };
