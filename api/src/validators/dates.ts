class DateValidator {
  public errors: string;

  public date: string;

  public constructor(date: string) {
    this.errors = "";
    this.date = this.validate(date);
  }

  private validate(date: string): string {
    if (!date) {
      this.errors += "date:A data não pode ser vazia.|";
      return "";
    }

    if (date.length < 10) {
      this.errors += "date:A data deve conter no mínimo 10 caracteres.|";
      return "";
    }

    if (date.length > 10) {
      this.errors += "date:A data deve conter no máximo 10 caracteres.|";
      return "";
    }

    if (!new Date(date).getDate()) {
      this.errors += "date:A data deve ser válida.|";
      return "";
    }

    return date.trim();
  }
}

export { DateValidator };
