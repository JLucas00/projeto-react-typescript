class ValueTransationValidator {
  public errors: string;

  public valueTransation: number;

  public constructor(valueTransation: number) {
    this.errors = "";
    this.valueTransation = this.validate(valueTransation);
  }

  private validate(valueTransation: number): number {
    if (!valueTransation) {
      this.errors += "valueTransation:O valor é obrigatório.|";
      return 0;
    }

    if (valueTransation <= 0) {
      this.errors += "valueTransation:O valor deve ser maior que zero.|";
      return 0;
    }

    return valueTransation;
  }
}

export { ValueTransationValidator };
