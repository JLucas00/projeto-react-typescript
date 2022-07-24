import { GetExtract } from "../controller";
import Router from "express";

const route = Router();

route
  .route("/get-extract")
  .post(new GetExtract().handle.bind(new GetExtract()));

export default route;
