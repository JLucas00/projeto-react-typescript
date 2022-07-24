import { PostgresDB } from ".";
import { Account } from "../../../models";

class AccountsTable extends PostgresDB {
  static insert: any;
  public async insert(account: Account): Promise<boolean> {
    try {
      this.client.connect();
      console.log(1);
      const insertAccountQuery = `
        INSERT INTO accounts (
          id,
          agency_number,
          agency_verification_code,
          account_number,
          account_verification_code,
          balance,
          user_id
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7
        ) RETURNING id
      `;

      const result = await this.client.query(insertAccountQuery, [
        account.id,
        account.agency,
        account.verificationAgencyDigit,
        account.accountNumber,
        account.verificationAccountDigit,
        account.balance,
        account.userId,
      ]);

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

  public async select(
    accountNumber: string,
    accountCode: string,
    agencyNumber: string,
    agencyCode: string
  ): Promise<any> {
    try {
      this.client.connect();

      const selectUserQuery = `
        SELECT * FROM accounts WHERE account_number = $1 AND account_verification_code = $2 AND agency_number = $3 AND agency_verification_code = $4
    `;

      const result = await this.client.query(selectUserQuery, [
        accountNumber,
        accountCode,
        agencyNumber,
        agencyCode,
      ]);

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

  public async selectforId(id: string): Promise<any> {
    try {
      this.client.connect();

      const selectUserQuery = `
        SELECT * FROM accounts WHERE id = $1
    `;

      const result = await this.client.query(selectUserQuery, [id]);

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
  public async updateBalance(
    accountOrigin: string,
    newBalance: number
  ): Promise<any> {
    try {
      this.client.connect();

      const updateBalanceQuery = `
      UPDATE accounts SET balance = $2 WHERE id = $1 RETURNING id
    `;

      const result = await this.client.query(updateBalanceQuery, [
        accountOrigin,
        newBalance,
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return result.rows[0];
      }

      return [];
    } catch (error) {
      this.client.end();
      console.log(error);
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { AccountsTable };
