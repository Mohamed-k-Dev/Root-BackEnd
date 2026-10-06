import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  restorePost,
  softDeletePost,
  updatePost,
  userPost,
  userPosts,
} from "./Service/post.service.js";
import { errorHandler } from "../../Middleware/errorHandler.middleware.js";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../../Middleware/auth.middleware.js";
import Multer from "../../Middleware/multer.middleware.js";
import {
  ALLOWED_IMAGE_TYPES,
  SYSTEM_RULES,
} from "../../Constants/Constants.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  restorePostSchema,
  getPostsSchema,
  updatePostSchema,
} from "../../validators/post.schema.js";
import { preparePostPayload } from "../../Middleware/post.middleware.js";

export const postsRouter = Router();

postsRouter.get(
  "/all",
  validationMiddleware(getPostsSchema),
  authenticationMiddleware,
  // authorizationMiddleware([SYSTEM_RULES.ADMIN]),
  errorHandler(getAllPosts)
);

postsRouter.get(
  "/user/posts",
  authenticationMiddleware,
  errorHandler(userPosts)
);

postsRouter.get(
  "/user/post/:postId",
  validationMiddleware(getPostSchema),
  errorHandler(userPost)
);

postsRouter.post(
  "/create",
  authenticationMiddleware,
  Multer(ALLOWED_IMAGE_TYPES).fields([{ name: "images", maxCount: 5 }]),
  preparePostPayload,
  validationMiddleware(createPostSchema),
  errorHandler(createPost)
);

postsRouter.patch(
  "/update/post/:postId",
  authenticationMiddleware,
  Multer(ALLOWED_IMAGE_TYPES).fields([{ name: "images", maxCount: 5 }]),
  preparePostPayload,
  validationMiddleware(updatePostSchema),
  errorHandler(updatePost)
);

postsRouter.patch(
  "/delete/:postId",
  authenticationMiddleware,
  validationMiddleware(deletePostSchema),
  errorHandler(softDeletePost)
);

postsRouter.delete(
  "/delete/:postId",
  authenticationMiddleware,
  authorizationMiddleware([SYSTEM_RULES.ADMIN]),
  validationMiddleware(deletePostSchema),
  errorHandler(deletePost)
);

postsRouter.patch(
  "/restore/:postId",
  authenticationMiddleware,
  validationMiddleware(restorePostSchema),
  errorHandler(restorePost)
);
