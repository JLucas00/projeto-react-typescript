import {
  CPFValidator,
  AgencyCodeValidator,
  AccountNumberValidator,
  AccountCodeValidator,
  AgencyNumberValidator,
  ValueTransationValidator,
  PasswordValidator,
} from ".";
import { WithdrawBody, User } from "../models";

class WithdrawBodyValidator {
  public user: {
    cpf: string;
  } = { cpf: "" };
  public withdraw: {
    value: number;
  } = { value: 0 };
  public account: {
    accountNumber: string;
    agency: string;
    verificationAgencyDigit: string;
    verificationAccountDigit: string;
    password: string;
  } = {
    accountNumber: "",
    agency: "",
    verificationAgencyDigit: "",
    verificationAccountDigit: "",
    password: "",
  };
  public errors: string;

  private agencyCodeValidator = AgencyCodeValidator;
  private accountNumberValidator = AccountNumberValidator;
  private accountCodeValidator = AccountCodeValidator;
  private cpfValidator = CPFValidator;
  private agencyNumberValidator = AgencyNumberValidator;
  private valueTransationValidator = ValueTransationValidator;
  private passwordValidator = PasswordValidator;

  public constructor(user: WithdrawBody) {
    this.errors = "";
    this.validate(user);
  }

  private validate(user: WithdrawBody) {
    const validAgencyCode = new this.agencyCodeValidator(
      user.account.verificationAgencyDigit
    );
    const validAccountNumber = new this.accountNumberValidator(
      user.account.accountNumber
    );
    const validAccountCode = new this.accountCodeValidator(
      user.account.verificationAccountDigit
    );
    const validCpf = new this.cpfValidator(user.account.cpf);
    const validAgencyNumber = new this.agencyNumberValidator(
      user.account.agency
    );
    const validValueTransation = new this.valueTransationValidator(user.value);

    const validPassword = new this.passwordValidator(user.account.password);

    this.errors = this.errors.concat(
      `${validAgencyCode.errors}${validAccountNumber.errors}${validAccountCode.errors}${validCpf.errors}${validAgencyNumber.errors}${validValueTransation.errors}`
    );

    this.user = { cpf: validCpf.cpf };
    this.account = {
      accountNumber: validAccountNumber.account,
      agency: validAgencyNumber.agency,
      verificationAgencyDigit: validAgencyCode.agencyCode,
      verificationAccountDigit: validAccountCode.accountCode,
      password: validPassword.password,
    };
    this.withdraw = {
      value: validValueTransation.valueTransation,
    };
  }
}

export { WithdrawBodyValidator };
