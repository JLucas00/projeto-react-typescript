class AgencyNumberValidator {
  public errors: string;

  public agency: string;

  public constructor(agency: string) {
    this.errors = "";
    this.agency = this.validate(agency);
  }

  private validate(agency: string): string {
    if (!agency) {
      this.errors += "agencyNumber:O número da agência não pode ser vazio.|";
      return "";
    }

    if (agency.length > 4) {
      this.errors +=
        "agencyNumber:O número da agência deve agência no máximo 4 caracteres.|";
      return "";
    }

    return agency.trim();
  }
}

export { AgencyNumberValidator };
