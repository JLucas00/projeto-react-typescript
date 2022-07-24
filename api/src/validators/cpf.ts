class CPFValidator {
  public errors: string;

  public cpf: string;

  private cpfRegex = /^\d{11}$/gi;

  public constructor(cpf: string) {
    this.errors = "";
    this.cpf = this.validate(cpf);
  }

  private validate(cpf: string): string {
    if (!cpf) {
      this.errors += "cpf:O CPF não pode ser vazio.|";
      return "";
    }

    if (cpf.length < 11) {
      this.errors += "cpf:O CPF deve conter no mínimo 14 caracteres.|";
      return "";
    }

    if (cpf.length > 11) {
      this.errors += "cpf:O CPF deve conter no máximo 14 caracteres.|";
      return "";
    }

    if (!this.cpfRegex.test(cpf)) {
      this.errors += "cpf:O CPF deve conter apenas números.|";
      return "";
    }

    if (!cpf.trim()) {
      this.errors += "cpf:O CPF não pode só conter espaços em branco.|";
      return "";
    }

    return cpf.trim();
  }
}

export { CPFValidator };
