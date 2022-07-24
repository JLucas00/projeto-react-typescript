import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server ola");
});
app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
