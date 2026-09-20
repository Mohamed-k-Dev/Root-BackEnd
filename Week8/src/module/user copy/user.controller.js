import { Router } from "express";
import { createBlog, getBlogsWithUser } from "./services/user.service.js";
const blogsRouter = Router();

blogsRouter.get("/getBlogsWithUser", getBlogsWithUser);
blogsRouter.post("/create", createBlog);

export default blogsRouter;
