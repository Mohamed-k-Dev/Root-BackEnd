import { Router } from "express";
import { login, signup } from "./services/user.service.js";

const userRouter = Router();

userRouter.get("/signup", signup);
userRouter.get("/login", login);

export default userRouter;



