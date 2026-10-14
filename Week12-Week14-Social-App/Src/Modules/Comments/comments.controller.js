import { Router } from "express";
import { authenticationMiddleware } from "../../Middleware/auth.middleware.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import { errorHandler } from "../../Middleware/errorHandler.middleware.js";
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentsRepliesSchema,
  getCommentsSchema,
  updateCommentSchema,
} from "../../validators/comment.schema.js";
import {
  CreateComment,
  deleteComment,
  getCommentsReplies,
  getPostComments,
  UpdateComment,
} from "./Service/comment.service.js";
import { ALLOWED_IMAGE_TYPES } from "../../Constants/Constants.js";
import Multer from "../../Middleware/multer.middleware.js";
import { preparePayload } from "../../Middleware/prepare.middleware.js";

export const commentsRouter = Router();

commentsRouter.post(
  "/:targetId",
  authenticationMiddleware,
  Multer(ALLOWED_IMAGE_TYPES).single("image"),
  preparePayload,
  validationMiddleware(createCommentSchema),
  errorHandler(CreateComment)
);

commentsRouter.patch(
  "/update/:commentId",
  authenticationMiddleware,
  Multer(ALLOWED_IMAGE_TYPES).single("image"),
  preparePayload,
  validationMiddleware(updateCommentSchema),
  errorHandler(UpdateComment)
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
