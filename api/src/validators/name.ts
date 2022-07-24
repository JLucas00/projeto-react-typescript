class NameValidator {
  public errors: string;

  public name: string;

  public constructor(name: string) {
    this.errors = "";
    this.name = this.validate(name);
  }

  private validate(name: string): string {
    if (!name) {
      this.errors += "name: campo obrigatório|";

      return "";
    }

    if (name.length < 3) {
      this.errors += "name: O nome deve conter no mínimo 3 caracteres.|";

      return "";
    }
    if (name.length > 80) {
      this.errors += "name: O nome deve conter no máximo 80 caracteres.|";

      return "";
    }

    if (!name.trim()) {
      this.errors += "name: O nome deve conter no mínimo 3 caracteres.|";

      return "";
    }

    return name.trim();
  }
}

export { NameValidator };
