class AgencyCodeValidator {
  public errors: string;

  public agencyCode: string;

  public constructor(agencyCode: string) {
    this.errors = "";
    this.agencyCode = this.validate(agencyCode);
  }

  private validate(agencyCode: string): string {
    if (!agencyCode) {
      this.errors +=
        "agencyCode:O número do dígito da agência não pode ser vazio.|";
      return "";
    }

    if (agencyCode.length < 1) {
      this.errors +=
        "agencyCode:O número do dígito da agência deve conter apenas 1 caractere.|";
      return "";
    }

    if (agencyCode.length > 1) {
      this.errors +=
        "agencyCode:O número do dígito da agência deve conter apenas 1 caractere.|";
      return "";
    }

    return agencyCode.trim();
  }
}

export { AgencyCodeValidator };
