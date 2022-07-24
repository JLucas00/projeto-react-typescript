import { CreateAccount } from "../controller";
import Router from "express";

const route = Router();

route
  .route("/create-account")
  .post(new CreateAccount().handle.bind(new CreateAccount()));

export default route;
