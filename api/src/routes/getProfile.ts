import { GetProfile } from "../controller";
import Router from "express";

const route = Router();

route
  .route("/get-profile")
  .post(new GetProfile().handle.bind(new GetProfile()));

export default route;
