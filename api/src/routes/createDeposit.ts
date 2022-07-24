import { CreateDeposit } from "../controller";
import Router from "express";

const route = Router();

route
  .route("/create-deposit")
  .post(new CreateDeposit().handle.bind(new CreateDeposit()));

export default route;
