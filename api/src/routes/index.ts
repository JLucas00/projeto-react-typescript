import CreateAccount from "./createAccount";
import CreateDeposit from "./createDeposit";
import CreateTransfer from "./createTransfer";
import CreateWithdraw from "./createWithdraw";
import GetExtract from "./getExtract";
import { Request, Response } from "express";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server ola");
});
app.get("/ping", (req, res) => {
  res.send("Pong");
});
app.use(CreateAccount);
app.use(CreateDeposit);
app.use(CreateTransfer);
app.use(CreateWithdraw);
app.use(GetExtract);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
export default app;
