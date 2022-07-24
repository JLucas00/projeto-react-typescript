class AccountNumberValidator {
  public errors: string;

  public account: string;

  public constructor(account: string) {
    this.errors = "";
    this.account = this.validate(account);
  }

  private validate(account: string): string {
    if (!account) {
      this.errors += "accountNumber:O número da conta não pode ser vazio.|";
      return "";
    }

    if (account.length < 6) {
      this.errors +=
        "accountNumber:O número da conta deve conter no mínimo 6 caracteres.|";
      return "";
    }

    if (account.length > 6) {
      this.errors +=
        "accountNumber:O número da conta deve conter no máximo 6 caracteres.|";
      return "";
    }

    return account.trim();
  }
}

export { AccountNumberValidator };
