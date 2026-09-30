import Joi from "joi";
import { UserCommonFields } from "../Utils/validation/commonFields.utils.js";

export const viewProfileSchema = {
  params: Joi.object({
    id: UserCommonFields.id.required(),
  }),
};

export const updatePasswordSchema = {
  body: Joi.object({
    oldPassword: UserCommonFields.password.required(),
    password: UserCommonFields.password.not(Joi.ref("oldPassword")).required(),
    confirmPassword: UserCommonFields.confirmPassword.required(),
  }),
};
