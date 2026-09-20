import Joi from "joi";
import { generalValidationFields } from "../../../Utils/generalValidationFields.utils.js";

export const sendMessageSchema = Joi.object().keys({
  receiverId: generalValidationFields.id.required().messages({
    "string.base": "Receiver ID must be a string",
    "string.hex": "Receiver ID must be a valid hex string",
    "string.length": "Receiver ID must be 24 characters long",
    "any.required": "Receiver ID is required",
  }),
  body: generalValidationFields.body.required().messages({
    "string.base": "Message content must be a string",
    "string.min": "Message content must be at least {#limit} characters long",
    "string.max": "Message content must be at most {#limit} characters long",
    "any.required": "Message content is required",
  }),
  authorization: generalValidationFields.authorization.required().messages({
    "string.token": "Authorization header must be a valid token",
    "any.required": "Authorization header is required",
  }),
});
