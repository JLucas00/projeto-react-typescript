import {
  CPFValidator,
  AgencyCodeValidator,
  AccountNumberValidator,
  AccountCodeValidator,
  AgencyNumberValidator,
  ValueTransationValidator,
} from ".";
import { DepositBody, User } from "../models";

class DepositBodyValidator {
  public user: {
    cpf: string;
  } = { cpf: "" };
  public deposit: {
    value: number;
  } = { value: 0 };
  public account: {
    accountNumber: string;
    agency: string;
    verificationAgencyDigit: string;
    verificationAccountDigit: string;
  } = {
    accountNumber: "",
    agency: "",
    verificationAgencyDigit: "",
    verificationAccountDigit: "",
  };
  public errors: string;

  private agencyCodeValidator = AgencyCodeValidator;
  private accountNumberValidator = AccountNumberValidator;
  private accountCodeValidator = AccountCodeValidator;
  private cpfValidator = CPFValidator;
  private agencyNumberValidator = AgencyNumberValidator;
  private valueTransationValidator = ValueTransationValidator;

  public constructor(user: DepositBody) {
    this.errors = "";
    this.validate(user);
  }

  private validate(user: DepositBody) {
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

    this.errors = this.errors.concat(
      `${validAgencyCode.errors}${validAccountNumber.errors}${validAccountCode.errors}${validCpf.errors}${validAgencyNumber.errors}${validValueTransation.errors}`
    );

    this.user = { cpf: validCpf.cpf };
    this.account = {
      accountNumber: validAccountNumber.account,
      agency: validAgencyNumber.agency,
      verificationAgencyDigit: validAgencyCode.agencyCode,
      verificationAccountDigit: validAccountCode.accountCode,
    };
    this.deposit = {
      value: validValueTransation.valueTransation,
    };
  }
}

export { DepositBodyValidator };
