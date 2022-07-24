import {
  CPFValidator,
  AgencyCodeValidator,
  AccountNumberValidator,
  AccountCodeValidator,
  AgencyNumberValidator,
  ValueTransationValidator,
  PasswordValidator,
} from ".";
import { WithdrawBody, User, TransferBody } from "../models";

class TransferBodyValidator {
  public userOrigin: {
    cpf: string;
  } = { cpf: "" };
  public userReceiver: {
    cpf: string;
  } = { cpf: "" };
  public transfer: {
    value: number;
  } = { value: 0 };
  public accountOrigin: {
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
  public accountReceiver: {
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
  private passwordValidator = PasswordValidator;

  public constructor(user: TransferBody) {
    this.errors = "";
    this.validate(user);
  }

  private validate(user: TransferBody) {
    const validAgencyCodeOrigin = new this.agencyCodeValidator(
      user.accountOrigin.verificationAgencyDigit
    );
    const validAccountNumberOrigin = new this.accountNumberValidator(
      user.accountOrigin.accountNumber
    );
    const validAccountCodeOrigin = new this.accountCodeValidator(
      user.accountOrigin.verificationAccountDigit
    );
    const validCpfOrigin = new this.cpfValidator(user.accountOrigin.cpf);
    const validAgencyNumberOrigin = new this.agencyNumberValidator(
      user.accountOrigin.agency
    );

    const validPasswordOrigin = new this.passwordValidator(
      user.accountOrigin.password
    );

    /* ----------------------- */
    const validValueTransation = new this.valueTransationValidator(user.value);

    /* ----------------------- */

    const validAgencyCodeReceiver = new this.agencyCodeValidator(
      user.accountReceiver.verificationAgencyDigit
    );
    const validAccountNumberReceiver = new this.accountNumberValidator(
      user.accountReceiver.accountNumber
    );
    const validAccountCodeReceiver = new this.accountCodeValidator(
      user.accountReceiver.verificationAccountDigit
    );
    const validCpfReceiver = new this.cpfValidator(user.accountReceiver.cpf);
    const validAgencyNumberReceiver = new this.agencyNumberValidator(
      user.accountReceiver.agency
    );

    this.errors = this.errors.concat(
      `${validAgencyCodeOrigin.errors}${validAccountNumberOrigin.errors}${validAccountCodeOrigin.errors}${validCpfOrigin.errors}${validAgencyNumberOrigin.errors}${validValueTransation.errors}${validAgencyCodeReceiver.errors}${validAccountNumberReceiver.errors}${validAccountCodeReceiver.errors}${validCpfReceiver.errors}${validAgencyNumberReceiver.errors}${validPasswordOrigin.errors}`
    );

    this.userOrigin = { cpf: validCpfOrigin.cpf };
    this.userReceiver = { cpf: validCpfReceiver.cpf };
    this.accountOrigin = {
      accountNumber: validAccountNumberOrigin.account,
      agency: validAgencyNumberOrigin.agency,
      verificationAgencyDigit: validAgencyCodeOrigin.agencyCode,
      verificationAccountDigit: validAccountCodeOrigin.accountCode,
      password: validPasswordOrigin.password,
    };
    this.accountReceiver = {
      accountNumber: validAccountNumberReceiver.account,
      agency: validAgencyNumberReceiver.agency,
      verificationAgencyDigit: validAgencyCodeReceiver.agencyCode,
      verificationAccountDigit: validAccountCodeReceiver.accountCode,
    };
    this.transfer = {
      value: validValueTransation.valueTransation,
    };
  }
}

export { TransferBodyValidator };
