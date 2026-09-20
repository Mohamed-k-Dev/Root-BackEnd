import joi from "joi";
import { generalValidationFields } from "../../../Utils/generalValidationFields.utils.js";

export const shareUserSchema = joi.object().keys({
  profileId : joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex string",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
  authorization: generalValidationFields.authorization.required().messages({
    "string.token": "Authorization header must be a valid token",
    "any.required": "Authorization header is required",
  }),
});

export const createUserSchema = joi.object().keys({
  userName: generalValidationFields.userName.required().messages({
    "string.min": `User Name must be at least {#limit} characters and you entered {#value.length} characters`,
    "string.max":
      "User Name must be at most {#limit} characters and you entered {#value.length} characters",
    "any.required": "User Name is required",
  }),
  email: generalValidationFields.email.required().messages({
    "string.email": "Please provide a valid email address with a valid domain",
    "any.required": "Email is required",
  }),
  password: generalValidationFields.password.required().messages({
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
    "any.required": "Password is required",
  }),
  confirmPassword: generalValidationFields.confirmPassword.required().messages({
    "any.only": "Confirm Password must match Password",
    "any.required": "Confirm Password is required",
  }),
  gender: generalValidationFields.gender.required().messages({
    "any.required": "Gender is required",
    "any.valid": "Gender must be either 'male' or 'female'",
  }),
  age: generalValidationFields.age.required().messages({
    "number.min": "Age must be at least {#limit} years old",
    "number.max": "Age must be at most {#limit} years old",
    "number.positive": "Age must be a positive number",
    "number.integer": "Age must be an integer",
    "any.required": "Age is required",
  }),
  isVerified: generalValidationFields.isVerified.messages({
    "boolean.base": "isVerified must be a boolean value",
  }),
  dateOfBirth: generalValidationFields.dateOfBirth.messages({
    "date.less": "Date of Birth must be less than the current date",
    "date.base": "Date of Birth must be a valid date",
  }),
  role: generalValidationFields.role.messages({
    "any.valid": "Role must be either 'admin' or 'user'",
  }),
  bio: generalValidationFields.bio.messages({
    "string.max": "Bio must be at most {#limit} characters long",
    "string.base": "Bio must be a string",
  }),
  address: generalValidationFields.address.messages({
    "string.base": "Address must be a string",
  }),
  phoneNumber: generalValidationFields.phoneNumber.required().messages({
    "string.pattern.base":
      "Phone Number must be a valid Egyptian mobile number ",
    "any.required": "Phone Number is required",
  }),
  authorization: generalValidationFields.authorization.required().messages({
    "string.token": "Authorization header must be a valid token",
    "any.required": "Authorization header is required",
  }),
});

export const authorizationUserSchema = joi.object().keys({
  authorization: generalValidationFields.authorization.required().messages({
    "string.token": "Authorization header must be a valid token",
    "any.required": "Authorization header is required",
  }),
});

export const deleteUserSchema = joi.object().keys({
  authorization: generalValidationFields.authorization.required().messages({
    "string.token": "Authorization header must be a valid token",
    "any.required": "Authorization header is required",
  }),
  id: joi.string().hex().length(24).required().messages({
    "string.base": "ID must be a string",
    "string.hex": "ID must be a valid hex string",
    "string.length": "ID must be 24 characters long",
    "any.required": "ID is required",
  }),
});

export const updateUserSchema = joi.object().keys({
  userName: generalValidationFields.userName.messages({
    "string.min": `User Name must be at least {#limit} characters and you entered {#value.length} characters`,
    "string.max":
      "User Name must be at most {#limit} characters and you entered {#value.length} characters",
  }),
  gender: generalValidationFields.gender.messages({
    "any.valid": "Gender must be either 'male' or 'female'",
  }),
  role: generalValidationFields.role.messages({
    "any.only": "Role must be either 'admin' or 'user'",
  }),
  bio: generalValidationFields.bio.messages({
    "string.max": "Bio must be at most {#limit} characters long",
    "string.base": "Bio must be a string",
  }),
  dateOfBirth: generalValidationFields.dateOfBirth.messages({
    "date.less": "Date of Birth must be less than the current date",
    "date.base": "Date of Birth must be a valid date",
  }),
  phoneNumber: generalValidationFields.phoneNumber.messages({
    "string.pattern.base":
      "Phone Number must be a valid Egyptian mobile number ",
  }),
  address: generalValidationFields.address.messages({
    "string.base": "Address must be a string",
  }),
  age: generalValidationFields.age.messages({
    "number.min": "Age must be at least {#limit} years old",
    "number.max": "Age must be at most {#limit} years old",
    "number.positive": "Age must be a positive number",
    "number.integer": "Age must be an integer",
  }),
  authorization: generalValidationFields.authorization.required().messages({
    "string.token": "Authorization header must be a valid token",
    "any.required": "Authorization header is required",
  }),
});

export const updateUserPasswordSchema = joi.object().keys({
  oldPassword: generalValidationFields.password.required().messages({
    "string.pattern.base":
      "Old Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
    "any.required": "Old Password is required",
  }),
  password: generalValidationFields.password
    .required()
    .not(joi.ref("oldPassword"))
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
      "any.required": "Password is required",
      "any.invalid": "Password cannot be the same as Old Password",
    }),
  confirmPassword: generalValidationFields.confirmPassword.required().messages({
    "any.only": "Confirm Password must match Password",
    "any.required": "Confirm Password is required",
  }),
  authorization: generalValidationFields.authorization.required().messages({
    "string.token": "Authorization header must be a valid token",
    "any.required": "Authorization header is required",
  }),
});

export const verifyFreezeAccountSchema = joi.object().keys({
  email: generalValidationFields.email.required().messages({
    "string.email": "Please provide a valid email address with a valid domain",
    "any.required": "Email is required",
  }),
});

export const restoreAccountSchema = joi.object().keys({
  email: generalValidationFields.email.required().messages({
    "string.email": "Please provide a valid email address with a valid domain",
    "any.required": "Email is required",
  }),
  otp: generalValidationFields.otp.required().messages({
    "string.length": "OTP must be exactly {#limit} digits long",
    "string.pattern.base": "OTP must contain only digits",
  }),
});
