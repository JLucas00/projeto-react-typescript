import {
  NameValidator,
  EmailValidator,
  CPFValidator,
  DateValidator,
  PasswordValidator,
} from ".";
import { User } from "../models";

class AccountDataValidator {
  public user: Partial<User>;
  public errors: string;

  private emailValidator = EmailValidator;
  private nameValidator = NameValidator;
  private dateValidator = DateValidator;
  private documentValidator = CPFValidator;
  private passwordValidator = PasswordValidator;

  public constructor(user: Partial<User>) {
    this.errors = "";
    this.user = this.validate(user);
  }

  private validate(user: Partial<User>): Partial<User> {
    const validEmail = new this.emailValidator(user.email || "");
    const validName = new this.nameValidator(user.name || "");
    const validBirthdate = new this.dateValidator(user.birthdate || "");
    const validDocument = new this.documentValidator(user.cpf || "");
    const validPassword = new this.passwordValidator(user.password || "");

    this.errors = this.errors.concat(
      `${validEmail.errors}${validName.errors}${validBirthdate.errors}${validDocument.errors}${validPassword.errors}`
    );

    const userData: Partial<User> = {
      birthdate: validBirthdate.date,
      email: validEmail.email,
      name: validName.name,
      cpf: validDocument.cpf,
      password: validPassword.password,
    };

    return userData;
  }
}

export { AccountDataValidator };
