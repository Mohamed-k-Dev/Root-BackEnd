import joi from "joi";
import { generalValidationFields } from "../../../Utils/generalValidationFields.utils.js";

export const signUpSchemaCustom = {
  body: joi
    .object()
    .keys({
      userName: joi
        .string()
        .required()
        .min(3)
        .max(30)
        .trim()
        .lowercase()
        .messages({
          "string.min": `User Name must be at least {#limit} characters and you entered {#value.length} characters`,
          "string.max":
            "User Name must be at most {#limit} characters and you entered {#value.length} characters",
          "any.required": "User Name is required",
        }),
      email: joi
        .string()
        .email({
          minDomainSegments: 2,
          maxDomainSegments: 4,
          ignoreLength: true,
          tlds: { allow: ["ude", "org", "ogr", "com", "net"] },
        })
        .messages({
          "string.email":
            "Please provide a valid email address with a valid domain",
          "any.required": "Email is required",
        }),
      password: joi
        .string()
        .required()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .messages({
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
          "any.required": "Password is required",
        }),
      confirmPassword: joi
        .string()
        .required()
        .valid(joi.ref("password"))
        .messages({
          "any.only": "Confirm Password must match Password",
          "any.required": "Confirm Password is required",
        }),
      gender: joi.string().required().valid("male", "female").messages({
        "any.required": "Gender is required",
        "any.valid": "Gender must be either 'male' or 'female'",
      }),
      age: joi
        .number()
        .required()
        .min(18)
        .max(100)
        .positive()
        .integer()
        .message({
          "number.min": "Age must be at least {#limit} years old",
          "number.max": "Age must be at most {#limit} years old",
          "number.positive": "Age must be a positive number",
          "number.integer": "Age must be an integer",
          "any.required": "Age is required",
        }),
      isVerified: joi.boolean().default("false").messages({
        "boolean.base": "isVerified must be a boolean value",
      }),
      dateOfBirth: joi.date().less("now").messages({
        "date.less": "Date of Birth must be less than the current date",
        "date.base": "Date of Birth must be a valid date",
      }),
      role: joi.string().valid("admin", "user").default("user").messages({
        "any.valid": "Role must be either 'admin' or 'user'",
        "any.required": "Role is required",
      }),
      bio: joi.string().max(500).default("").messages({
        "string.max": "Bio must be at most {#limit} characters long",
        "any.required": "Bio is required",
        "string.base": "Bio must be a string",
      }),
      address: joi.string().required().messages({
        "any.required": "Address is required",
        "string.base": "Address must be a string",
      }),
      phoneNumber: joi
        .string()
        .required()
        .pattern(/^(002|\+2)?01[0125][0-9]{8}$/)
        .messages({
          "string.pattern.base":
            "Phone Number must be a valid Egyptian mobile number ",
          "any.required": "Phone Number is required",
        }),
    })
    .required(),

  params: joi
    .object()
    .keys({
      id: joi.number().required().positive().integer().messages({
        "number.positive": "Age must be a positive number",
        "number.integer": "Age must be an integer",
        "any.required": "Age is required",
        "number.base": "ID must be a number",
      }),
    })
    .required(),

  headers: joi
    .object()
    .keys({
      authorization: joi.string().required().token().messages({
        "string.base": "Authorization header must be a string",
        "any.required": "Authorization header is required",
        "string.token": "Authorization header must be a valid token",
      }),
    })
    .required()
    .options({ allowUnknown: true }),
};

export const signUpSchema = joi
  .object()
  .keys({
    userName: generalValidationFields.userName.required().messages({
      "string.min": `User Name must be at least {#limit} characters and you entered {#value.length} characters`,
      "string.max":
        "User Name must be at most {#limit} characters and you entered {#value.length} characters",
      "any.required": "User Name is required",
    }),
    email: generalValidationFields.email.required().messages({
      "string.email":
        "Please provide a valid email address with a valid domain",
      "any.required": "Email is required",
    }),
    password: generalValidationFields.password.required().messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
      "any.required": "Password is required",
    }),
    confirmPassword: generalValidationFields.confirmPassword
      .required()
      .messages({
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
    bio: generalValidationFields.bio.messages({
      "string.max": "Bio must be at most {#limit} characters long",
      "any.required": "Bio is required",
      "string.base": "Bio must be a string",
    }),
    address: generalValidationFields.address.messages({
      "any.required": "Address is required",
      "string.base": "Address must be a string",
    }),
    phoneNumber: generalValidationFields.phoneNumber.required().messages({
      "string.pattern.base":
        "Phone Number must be a valid Egyptian mobile number ",
      "any.required": "Phone Number is required",
    }),
  })
  .required();

export const logInSchema = joi
  .object()
  .keys({
    email: generalValidationFields.email.required().messages({
      "string.email":
        "Please provide a valid email address with a valid domain",
      "any.required": "Email is required",
    }),
    password: generalValidationFields.password.required().messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
      "any.required": "Password is required",
    }),
  })
  .required();

export const verifySchema = joi
  .object()
  .keys({
    authorization: generalValidationFields.authorization.required().messages({
      "string.token": "Authorization header must be a valid token",
      "any.required": "Authorization header is required",
    }),
  })
  .required();
