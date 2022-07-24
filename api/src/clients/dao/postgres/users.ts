import { PostgresDB } from ".";
import { User } from "../../../models";

class UsersTable extends PostgresDB {
  public async insert(user: User): Promise<boolean> {
    try {
      this.client.connect();

      const insertUserQuery = `
        INSERT INTO users (
          id,
          name,
          email,
          birthdate,
          password,
          document
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6
        ) RETURNING id
    `;

      const result = await this.client.query(insertUserQuery, [
        user.id,
        user.name,
        user.email,
        user.birthdate,
        user.password,
        user.cpf,
      ]);
      console.log(result);
      this.client.end();

      if (result.rows.length !== 0) {
        return true;
      }

      return false;
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }
  public async select(cpf: string): Promise<any> {
    try {
      this.client.connect();

      const selectUserQuery = `
        SELECT * FROM users WHERE document = $1
    `;

      const result = await this.client.query(selectUserQuery, [cpf]);

      this.client.end();

      if (result.rows.length !== 0) {
        return result.rows[0];
      }

      return null;
    } catch (error) {
      this.client.end();

      throw new Error("503: service temporarily unavailable");
    }
  }
  public async selectForPassword(cpf: string, password: string): Promise<any> {
    try {
      this.client.connect();

      const selectUserQuery = `
        SELECT * FROM users WHERE document = $1 AND password = $2
    `;

      const result = await this.client.query(selectUserQuery, [cpf, password]);

      this.client.end();

      if (result.rows.length !== 0) {
        return result.rows[0];
      }

      return null;
    } catch (error) {
      this.client.end();

      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { UsersTable };
