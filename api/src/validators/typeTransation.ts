class TypeTransationValidator {
  public errors: string;

  public typeTransation: string;

  public constructor(typeTransation: string) {
    this.errors = "";
    this.typeTransation = this.validate(typeTransation);
  }

  private validate(typeTransation: string): string {
    if (!typeTransation) {
      this.errors += "typeTransation: campo obrigatório|";

      return "";
    }

    if (typeTransation !== ("withdraw" && "transfer" && "deposti")) {
      this.errors += "typeTransation: transação inválida.|";

      return "";
    }

    return typeTransation.trim();
  }
}

export { TypeTransationValidator };
