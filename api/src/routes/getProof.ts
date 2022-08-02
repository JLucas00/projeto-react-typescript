import { GetProof } from "../controller";
import Router from "express";

const route = Router();

route.route("/get-proof").post(new GetProof().handle.bind(new GetProof()));

export default route;
