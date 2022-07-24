import { Client } from "pg";
import { config } from "../../../config";

class PostgresDB {
  protected client: Client;

  public constructor() {
    this.client = new Client({
      port: config.POSTGRES.DB_PORT,
      host: config.POSTGRES.DB_HOST,
      password: config.POSTGRES.DB_PASSWORD,
      user: config.POSTGRES.DB_USER,
      database: config.POSTGRES.DB_NAME,
    });
  }
}

export { PostgresDB };
