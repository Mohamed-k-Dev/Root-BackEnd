import { Router } from "express";
import {
  addUser,
  deleteUser,
  getProfile,
  getUser,
  getUsers,
  updateUser,
} from "./services/user.service.js";
const userRouter = Router();

userRouter.post("/", getUser);
userRouter.get("/profile/:id", getProfile);
userRouter.get("/getUsers", getUsers);
userRouter.post("/addUser ", addUser);
userRouter.patch("/updateUser/:id", updateUser);
userRouter.delete("/deleteUser/:id", deleteUser);

export default userRouter;
