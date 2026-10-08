import Joi from "joi";
import mongoose from "mongoose";
import {
  COMMENT_TARGET_TYPES,
  REACTION_TARGET_TYPES,
  REACTION_TYPES,
} from "../../Constants/Constants.js";

const isValidObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

export const paginationCommonFields = {
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be at least 1",
    "number.integer": "Page must be an integer",
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit must be at most 100",
    "number.integer": "Limit must be an integer",
  }),
  sort: Joi.string().valid("asc", "desc").default("desc").messages({
    "string.base": "Sort must be a string",
    "string.valid": "Sort must be either 'asc' or 'desc'",
  }),
};

export const UserCommonFields = {
  id: Joi.custom(isValidObjectId).messages({
    "any.required": "ID is required",
    "any.invalid": "Invalid ID",
  }),
  userName: Joi.string().trim().min(3).max(30).messages({
    "string.min": "User name must be at least 3 characters long",
    "string.max": "User name must be at most 30 characters long",
    "any.required": "User name is required",
    "string.empty": "User name is required",
    "string.base": "User name must be a string",
  }),
  email: Joi.string()
    .email({
      tlds: {
        allow: ["com", "net", "org", "edu", "gov", "mil", "io", "co"],
      },
      maxDomainSegments: 2,
    })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .messages({
      "string.email": "Please fill a valid email address",
      "any.required": "Email is required",
      "string.empty": "Email is required",
      "string.base": "Email must be a string",
    }),
  password: Joi.string()
    .min(8)
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 100 characters long",
      "any.required": "Password is required",
      "string.empty": "Password is required",
      "string.base": "Password must be a string",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.invalid": "New password can not be same as old password",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Password and confirm password must match",
    "any.required": "Confirm password is required",
    "string.empty": "Confirm password is required",
    "string.base": "Confirm password must be a string",
    "any.invalid": "New password can not be same as old password",
  }),
  gender: Joi.string().valid("male", "female").default("male").messages({
    "any.only": "Gender must be 'male' or 'female'",
    "any.required": "Gender is required",
    "string.empty": "Gender is required",
    "string.base": "Gender must be a string",
  }),
  age: Joi.number().min(18).max(100).messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be at least 18",
    "number.max": "Age must be at most 100",
    "any.required": "Age is required",
  }),
  phone: Joi.string().messages({
    "string.base": "Phone must be a string",
  }),
  address: Joi.string().messages({
    "string.base": "Address must be a string",
  }),
  bio: Joi.string().max(500).messages({
    "string.base": "bio must be a string",
    "string.max": "bio must be at most 500 characters long",
  }),
  birthDate: Joi.date().messages({
    "string.base": "birth Date must be a string",
  }),
  imageUrl: Joi.string().messages({
    "string.base": "image Url must be a string",
  }),
  coverImageUrl: Joi.array().items(Joi.string()).messages({
    "array.base": "cover Images must be an array",
    "string.base": "cover Image Url must be a string",
  }),
  role: Joi.string()
    .valid("user", "admin", "super-admin")
    .default("user")
    .messages({
      "any.only": "Role must be 'user', 'admin', or 'super-admin'",
    }),
};

export const AuthCommonFields = {
  otp: Joi.string()
    .required()
    .regex(/^[0-9]{6}$/)
    .messages({
      "string.length": "OTP must be 6 digits",
      "string.pattern.base": "OTP must be a 6-digit number",
      "any.required": "OTP is required",
      "string.empty": "OTP is required",
      "string.base": "OTP must be a string",
    }),

  idToken: Joi.string().required().messages({
    "any.required": "ID token is required",
    "string.empty": "ID token is required",
    "string.base": "ID token must be a string",
  }),
};

export const PostCommonFields = {
  postId: Joi.custom(isValidObjectId).required().messages({
    "any.required": "Post id is required",
    "string.empty": "Post id is required",
    "string.base": "Post id must be a string",
    "any.invalid": "Invalid Post id",
    "any.required": "Post id is required",
  }),
  content: Joi.string().trim().min(2).max(5000).messages({
    "string.base": "Content must be a string",
    "string.min": "Content must be at least {#limit} characters long",
    "string.max": "Content must be at most {#limit} characters long",
    "string.empty": "Content cannot be empty",
  }),
  tags: Joi.array()
    .items(Joi.string().trim().lowercase().min(2).max(30))
    .min(1)
    .max(10)
    .unique()
    .messages({
      "array.base": "Tags must be an array",
      "array.min": "You must add at least 1 tag",
      "array.max": "You can add at most 10 tags",
      "array.unique": "Tags must be unique",
      "string.min": "Each tag must be at least 2 character long",
      "string.max": "Each tag must be at most 30 characters long",
      "string.empty": "Tags cannot be empty",
    }),
  images: Joi.array()
    .items(
      Joi.object({
        originalname: Joi.string().required().messages({
          "string.base": "Original name must be a string",
          "any.required": "Original name is required",
        }),
        encoding: Joi.string()
          .valid("7bit", "8bit", "base64", "binary", "hex")
          .required()
          .messages({
            "string.base": "Encoding must be a string",
            "string.valid":
              "Encoding must be one of '7bit', '8bit', 'base64', 'binary', 'hex'",
            "any.required": "Encoding is required",
          }),
        path: Joi.string().required().messages({
          "string.base": "Path must be a string",
          "any.required": "Path is required",
        }),
        destination: Joi.string().required().messages({
          "string.base": "Destination must be a string",
          "any.required": "Destination is required",
        }),
        filename: Joi.string().required().messages({
          "string.base": "Filename must be a string",
          "any.required": "Filename is required",
        }),
        size: Joi.number().required().messages({
          "number.base": "Size must be a number",
          "any.required": "Size is required",
        }),
        mimetype: Joi.string().required().messages({
          "string.base": "Mimetype must be a string",
          "any.required": "Mimetype is required",
        }),
        fieldname: Joi.string().required().messages({
          "string.base": "Fieldname must be a string",
          "any.required": "Fieldname is required",
        }),
      })
    )
    .max(5),

  status: Joi.string()
    .valid("active", "deleted", "all")
    .default("active")
    .messages({
      "any.only": "Status must be 'active', 'deleted', or 'all'",
      "string.base": "Status must be a string",
    }),
};

export const ReactionCommonFields = {
  targetType: Joi.string()
    .valid(...Object.values(REACTION_TARGET_TYPES))
    .required()
    .messages({
      "any.only": `Target type must be one of ${Object.values(
        REACTION_TARGET_TYPES
      ).join(", ")}`,
      "any.required": "Target type is required",
      "string.empty": "Target type is required",
      "string.base": "Target type must be a string",
    }),
  targetId: Joi.custom(isValidObjectId).required().messages({
    "any.required": "Target id is required",
    "string.empty": "Target id is required",
    "string.base": "Target id must be a string",
    "any.invalid": "Invalid Target id",
  }),
  reaction: Joi.string()
    .valid(...Object.values(REACTION_TYPES))
    .required()
    .messages({
      "any.only": `Reaction must be one of  ${Object.values(
        REACTION_TYPES
      ).join(", ")}`,
      "any.required": "Reaction is required",
      "string.empty": "Reaction is required",
      "string.base": "Reaction must be a string",
    }),
};

export const commentCommonFields = {
  targetType: Joi.string()
    .required()
    .valid(...Object.values(COMMENT_TARGET_TYPES))
    .messages({
      "any.only": `Target type must be one of ${Object.values(
        COMMENT_TARGET_TYPES
      ).join(", ")}`,
      "any.required": "Target type is required",
      "string.empty": "Target type is required",
      "string.base": "Target type must be a string",
    }),
  targetId: Joi.custom(isValidObjectId).required().messages({
    "any.required": "Target id is required",
    "string.empty": "Target id is required",
    "string.base": "Target id must be a string",
    "any.invalid": "Invalid Target id",
  }),
  content: Joi.string().min(1).max(1000).required().messages({
    "any.required": "Content is required",
    "string.empty": "Content is required",
    "string.base": "Content must be a string",
    "string.min": "Content must be at least 1 character long",
    "string.max": "Content must be at most 1000 characters long",
  }),
  parentComment: Joi.custom(isValidObjectId).messages({
    "any.invalid": "Invalid Parent comment id",
    "string.base": "Parent comment id must be a string",
  }),
};
