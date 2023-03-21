import userRoute from "./user";
import { Router } from "express";

const route = Router();

route.use("/auth/", userRoute);

export default route;
