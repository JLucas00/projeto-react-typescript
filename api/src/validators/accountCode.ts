class AccountCodeValidator {
  public errors: string;

  public accountCode: string;

  public constructor(accountCode: string) {
    this.errors = "";
    this.accountCode = this.validate(accountCode);
  }

  private validate(accountCode: string): string {
    if (!accountCode) {
      this.errors +=
        "accountCode:O número do dígito da conta não pode ser vazio.|";
      return "";
    }

    if (accountCode.length < 1) {
      this.errors +=
        "accountCode:O número do dígito da conta deve conter apenas 1 caractere.|";
      return "";
    }

    if (accountCode.length > 1) {
      this.errors +=
        "accountCode:O número do dígito da conta deve conter apenas 1 caractere.|";
      return "";
    }

    return accountCode.trim();
  }
}

export { AccountCodeValidator };
