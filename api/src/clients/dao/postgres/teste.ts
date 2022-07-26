import { PostgresDB } from ".";

class DbTest extends PostgresDB {
  public async execute() {
    await this.client.connect();
    const res = await this.client.query("SELECT $1::text as message", [
      "Database respond with a:",
    ]);
    //console.log(res.rows[0].message); // Hello world!
    await this.client.end();
  }
}

export { DbTest };
