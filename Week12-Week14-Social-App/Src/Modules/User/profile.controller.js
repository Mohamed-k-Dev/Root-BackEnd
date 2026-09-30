import { Router } from "express";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../../Middleware/auth.middleware.js";
import {
  getProfile,
  viewProfile,
  updatePassword,
  updateProfile,
  listUsers,
  uploadProfileImage,
  uploadProfileImages,
} from "./Services/profile.service.js";
import {
  ALLOWED_IMAGE_TYPES,
  SYSTEM_RULES,
} from "../../Constants/Constants.js";
import { errorHandler } from "../../Middleware/errorHandler.middleware.js";
import Multer from "../../Middleware/multer.middleware.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import {
  updatePasswordSchema,
  viewProfileSchema,
} from "../../validators/user.schema.js";

export const userRouter = Router();
const { ADMIN, USER } = SYSTEM_RULES;

userRouter.get(
  "/list",
  authenticationMiddleware,
  authorizationMiddleware([ADMIN]),
  listUsers
);

userRouter.get("/profile", authenticationMiddleware, errorHandler(getProfile));

userRouter.patch(
  "/update/password",
  validationMiddleware(updatePasswordSchema),
  authenticationMiddleware,
  errorHandler(updatePassword)
);

userRouter.patch(
  "/update/profile",
  authenticationMiddleware,
  errorHandler(updateProfile)
);

userRouter.patch(
  "/upload/profile-image",
  authenticationMiddleware,
  Multer(ALLOWED_IMAGE_TYPES).single("profileImage"),
  errorHandler(uploadProfileImage)
);

userRouter.patch(
  "/upload/coverImages",
  authenticationMiddleware,
  Multer(ALLOWED_IMAGE_TYPES).array("coverImages", 3),
  errorHandler(uploadProfileImages)
);

// userRouter.patch(
//   "/upload/coverImages",
//   authenticationMiddleware,
//   Multer(ALLOWED_IMAGE_TYPES).fields([{ name: "coverImages", maxCount: 3 }]),
//   errorHandler(uploadProfileImages)
// );

userRouter.get(
  "/view-profile/:id",
  validationMiddleware(viewProfileSchema),
  authenticationMiddleware,
  errorHandler(viewProfile)
);
