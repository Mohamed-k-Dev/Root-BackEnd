import joi from "joi";

export const generalValidationFields = {
  userName: joi.string().min(3).max(30).trim().lowercase(),
  email: joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments: 4,
    ignoreLength: true,
    tlds: { allow: ["ude", "org", "ogr", "com", "net"] },
  }),
  password: joi
    .string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  confirmPassword: joi.string().valid(joi.ref("password")),
  gender: joi.string().valid("male", "female"),
  role: joi.string().valid("admin", "user").default("user"),
  isVerified: joi.boolean().default("false"),
  bio: joi.string().max(500).default(""),
  dateOfBirth: joi.date().less("now"),
  phoneNumber: joi.string().pattern(/^(002|\+2)?01[0125][0-9]{8}$/),
  address: joi.string(),
  age: joi.number().min(18).max(100).positive().integer(),
  authorization: joi.string(),
  otp: joi
    .string()
    .length(6)
    .pattern(/^[0-9]+$/),
  id: joi.string().hex().length(24),
  body: joi.string().min(1).max(1000).trim(),
};
