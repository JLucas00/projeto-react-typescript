import { CreateTransfer } from "../controller";
import Router from "express";

const route = Router();

route
  .route("/create-transfer")
  .post(new CreateTransfer().handle.bind(new CreateTransfer()));

export default route;
