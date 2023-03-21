import UserController from "../../controllers/user";
import { Router } from "express";

const userRoute = Router();
userRoute.post("/signup", UserController.registeration);
userRoute.post("/signin", UserController.signIn);
export default userRoute;
