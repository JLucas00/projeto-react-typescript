import { PostgresDB } from ".";
import { Transations } from "../../../models";

class TransationsTable extends PostgresDB {
  public async insert(transation: Transations): Promise<any> {
    try {
      this.client.connect();
      const insertTransationQuery = `
        INSERT INTO transations (
          id,
          date,
          value,
          type,
          origin_account_id,
          destination_account_id
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6
        ) RETURNING *
    `;

      const result = await this.client.query(insertTransationQuery, [
        transation.id,
        transation.date,
        transation.value,
        transation.type,
        transation.originId,
        transation.receiverId,
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return result.rows[0];
      }

      return false;
    } catch (error) {
      console.log(error);
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }

  public async listReceiver(accountReceiver: string): Promise<any> {
    try {
      this.client.connect();

      const selectTransationQuery = `
        SELECT * FROM transations WHERE destination_account_id = $1
    `;

      const result = await this.client.query(selectTransationQuery, [
        accountReceiver,
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return result.rows;
      }

      return [];
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }
  public async listOrigin(accountOrigin: string): Promise<any> {
    try {
      this.client.connect();

      const selectTransationQuery = `
        SELECT * FROM transations WHERE origin_account_id = $1
    `;

      const result = await this.client.query(selectTransationQuery, [
        accountOrigin,
      ]);

      this.client.end();

      if (result.rows.length !== 0) {
        return result.rows;
      }

      return [];
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }
  public async extract(account: string): Promise<any> {
    try {
      this.client.connect();

      const selectTransationQuery = `
        SELECT * FROM transations WHERE destination_account_id = $1 OR origin_account_id = $1 ORDER BY date DESC
    `;

      const result = await this.client.query(selectTransationQuery, [account]);

      this.client.end();

      if (result.rows.length !== 0) {
        return result.rows;
      }

      return [];
    } catch (error) {
      this.client.end();
      throw new Error("503: service temporarily unavailable");
    }
  }
}

export { TransationsTable };
