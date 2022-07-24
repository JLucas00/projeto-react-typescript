import { CreateWithdraw } from "../controller";
import Router from "express";

const route = Router();

route
  .route("/create-withdraw")
  .post(new CreateWithdraw().handle.bind(new CreateWithdraw()));

export default route;
