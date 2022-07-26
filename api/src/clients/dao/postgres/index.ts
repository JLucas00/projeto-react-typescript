import { Client } from "pg";
import { config } from "../../../config";

class PostgresDB {
  protected client: Client;

  public constructor() {
    this.client =
      new Client({
        connectionString: config.POSTGRES.CONNECTION_STRING,
        ssl: { rejectUnauthorized: false },
      }) ||
      new Client({
        user: config.POSTGRES.DB_USER,
        password: config.POSTGRES.DB_PASSWORD,
        database: config.POSTGRES.DB_DATABASE,
        port: config.POSTGRES.DB_PORT,
        host: config.POSTGRES.DB_HOST,
        ssl: { rejectUnauthorized: false },
      });
  }
}

export { PostgresDB };
