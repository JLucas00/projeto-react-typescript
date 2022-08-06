import { Login } from "../controller";
import Router from "express";

const route = Router();

route.route("/login").post(new Login().handle.bind(new Login()));

export default route;
