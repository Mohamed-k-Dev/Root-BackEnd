import { Router } from "express";
import { authentication } from "../../Middleware/authentication.middleware.js";
import { sendMessage } from "./Service/Message.service.js";
import { errorHandler } from "../../Utils/errorHandler.utils.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import { sendMessageSchema } from "./Validation/message.schema.js";

export const messageRouter = Router();

messageRouter.post(
  "/send-message",
  validationMiddleware(sendMessageSchema),
  authentication,
  errorHandler(sendMessage)
);
