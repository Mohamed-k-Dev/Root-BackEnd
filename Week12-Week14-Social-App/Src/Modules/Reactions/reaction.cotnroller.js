import { Router } from "express";
import { authenticationMiddleware } from "../../Middleware/auth.middleware.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import { react } from "./Services/reaction.service.js";
import { ReactSchema } from "../../validators/Reaction.schema.js";
import { errorHandler } from "../../Middleware/errorHandler.middleware.js";

export const reactionRouter = Router();

reactionRouter.post(
  "/:targetId",
  authenticationMiddleware,
  validationMiddleware(ReactSchema),
  errorHandler(react)
);
