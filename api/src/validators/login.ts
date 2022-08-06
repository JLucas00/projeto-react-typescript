import { CPFValidator, PasswordValidator } from ".";
import { Login } from "../models";

class LoginValidator {
  public login: Login;
  public errors: string;

  private documentValidator = CPFValidator;
  private passwordValidator = PasswordValidator;

  public constructor(login: Login) {
    this.errors = "";
    this.login = this.validate(login);
  }

  private validate(login: Login) {
    const validDocument = new this.documentValidator(login.cpf || "");
    const validPassword = new this.passwordValidator(login.password || "");

    this.errors = this.errors.concat(
      `${validDocument.errors}${validPassword.errors}`
    );

    const loginData: Login = {
      cpf: validDocument.cpf,
      password: validPassword.password,
    };

    return loginData;
  }
}

export { LoginValidator };
