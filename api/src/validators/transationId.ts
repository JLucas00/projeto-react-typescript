class TransationIdValidator {
  public errors: string;

  public id: string;

  public constructor(id: string) {
    this.errors = "";
    this.id = this.validate(id);
  }

  private validate(id: string): string {
    if (!id) {
      this.errors += "id: campo obrigatório|";

      return "";
    }

    return id.trim();
  }
}

export { TransationIdValidator };
