import { Router } from "express";
import {
  createUser,
  deleteAllUsers,
  deleteUser,
  freezeAccount,
  getAllUsers,
  getUser,
  restoreAccount,
  shareProfile,
  updateUser,
  updateUserPassword,
  verifyFreezeAccount,
} from "./Service/User.service.js";
import {
  authentication,
  authorization,
} from "../../Middleware/authentication.middleware.js";
import { ROLES } from "../../Constant/Constants.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import {
  authorizationUserSchema,
  createUserSchema,
  deleteUserSchema,
  restoreAccountSchema,
  shareUserSchema,
  updateUserPasswordSchema,
  updateUserSchema,
  verifyFreezeAccountSchema,
} from "./Validation/User.schema.js";
import { errorHandler } from "../../Utils/errorHandler.utils.js";

export const userRouter = Router();

userRouter.post(
  "/createUser",
  validationMiddleware(createUserSchema),
  authentication,
  authorization(ROLES.ADMIN),
  errorHandler(createUser)
);

userRouter.get(
  "/profile",
  validationMiddleware(authorizationUserSchema),
  authentication,
  errorHandler(getUser)
);

userRouter.get(
  "/profile/:profileId",
  validationMiddleware(shareUserSchema),
  authentication,
  errorHandler(shareProfile)
);

userRouter.get(
  "/getAllUsers",
  validationMiddleware(authorizationUserSchema),
  // authentication,
  // authorization(ROLES.ADMIN),
  errorHandler(getAllUsers)
);

userRouter.patch(
  "/updateUserProfile",
  validationMiddleware(updateUserSchema),
  authentication,
  errorHandler(updateUser)
);

userRouter.patch(
  "/updateUserPassword",
  validationMiddleware(updateUserPasswordSchema),
  authentication,
  errorHandler(updateUserPassword)
);

userRouter.delete(
  "/freezeAccount",
  validationMiddleware(authorizationUserSchema),
  authentication,
  errorHandler(freezeAccount)
);

userRouter.patch(
  "/verifyFreezeAccount",
  validationMiddleware(verifyFreezeAccountSchema),
  errorHandler(verifyFreezeAccount)
);

userRouter.post(
  "/restoreAccount",
  validationMiddleware(restoreAccountSchema),
  errorHandler(restoreAccount)
);

userRouter.delete(
  "/deleteUser/:id",
  validationMiddleware(deleteUserSchema),
  authentication,
  authorization(ROLES.ADMIN),
  errorHandler(deleteUser)
);

userRouter.delete(
  "/deleteAllUsers",
  validationMiddleware(authorizationUserSchema),
  authentication,
  authorization(ROLES.ADMIN),
  errorHandler(deleteAllUsers)
);
