import { Router } from "express";
import { login, signUp, verifyEmail } from "./Services/Auth.service.js";
import { errorHandler } from "../../Utils/errorHandler.utils.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import { logInSchema, signUpSchema } from "./Validation/Auth.schema.js";

const authRouter = Router();

authRouter.post(
  "/signUp",
  validationMiddleware(signUpSchema),
  errorHandler(signUp)
);

authRouter.post(
  "/login",
  validationMiddleware(logInSchema),
  errorHandler(login)
);

authRouter.patch("/verify-email", errorHandler(verifyEmail));

export default authRouter;
