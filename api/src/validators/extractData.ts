import {
  AgencyNumberValidator,
  AgencyCodeValidator,
  AccountNumberValidator,
  AccountCodeValidator,
  CPFValidator,
} from ".";
import { User, Extract } from "../models";

class ExtractDataValidator {
  public user: {
    cpf: string;
  } = { cpf: "" };
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

  private agencyNumberValidator = AgencyNumberValidator;
  private agencyCodeValidator = AgencyCodeValidator;
  private accountNumberValidator = AccountNumberValidator;
  private documentValidator = CPFValidator;
  private accountCodeValidator = AccountCodeValidator;

  public constructor(body: Extract) {
    this.errors = "";
    this.validate(body);
  }

  private validate(body: Extract) {
    const validAgencyNumber = new this.agencyNumberValidator(body.agency);
    const validAgencyCode = new this.agencyCodeValidator(
      body.verificationAgencyDigit
    );
    const validAccountNumber = new this.accountNumberValidator(
      body.accountNumber
    );
    const validDocument = new this.documentValidator(body.cpf);
    const validAccountCode = new this.accountCodeValidator(
      body.verificationAccountDigit
    );

    this.errors = this.errors.concat(
      `${validAgencyNumber.errors}${validAgencyCode.errors}${validAccountNumber.errors}${validDocument.errors}${validAccountCode.errors}`
    );

    this.user = { cpf: validDocument.cpf };
    this.account = {
      accountNumber: validAccountNumber.account,
      agency: validAgencyNumber.agency,
      verificationAgencyDigit: validAgencyCode.agencyCode,
      verificationAccountDigit: validAccountCode.accountCode,
    };
  }
}

export { ExtractDataValidator };
