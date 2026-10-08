import { Router } from "express";
import { authenticationMiddleware } from "../../Middleware/auth.middleware.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import { errorHandler } from "../../Middleware/errorHandler.middleware.js";
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentsRepliesSchema,
  getCommentsSchema,
} from "../../validators/comment.schema.js";
import {
  CreateComment,
  deleteComment,
  getCommentsReplies,
  getPostComments,
} from "./Service/comment.service.js";

export const commentsRouter = Router();

commentsRouter.post(
  "/:targetId",
  authenticationMiddleware,
  validationMiddleware(createCommentSchema),
  errorHandler(CreateComment)
);

commentsRouter.get(
  "/post/:postId",
  authenticationMiddleware,
  validationMiddleware(getCommentsSchema),
  errorHandler(getPostComments)
);

commentsRouter.get(
  "/:commentId/replies",
  authenticationMiddleware,
  validationMiddleware(getCommentsRepliesSchema),
  errorHandler(getCommentsReplies)
);

commentsRouter.delete(
  "/delete/:commentId",
  authenticationMiddleware,
  validationMiddleware(deleteCommentSchema),
  errorHandler(deleteComment)
);
