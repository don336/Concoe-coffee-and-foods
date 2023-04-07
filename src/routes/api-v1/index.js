import { Router } from "express";
import userRoute from "./user";
import cropRouter from "./crop"

const route = Router();

route.use("/auth/", userRoute);
route.use("/crop/", cropRouter);

export default route;
