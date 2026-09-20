// ? joi
// * is using for validation of the request body.
// * abortEarly: false means that all validation errors will be returned, not just the first one.

import joi from "joi";
const validationSchema = joi.object({ fields: joi.string() });
const results = validationSchema.validate(
  { fields },
  {
    abortEarly: false,
  }
);

// ? string validation using Joi
// * joi.string() is used to validate that the field is a string.
// * .required() ensures that the field is provided.
// * .min(3) sets the minimum length of the field to 3 characters.
// * .max(30) sets the maximum length of the field to 30 characters.
// * .valid("mohamed", "khaled") ensures that the field is one of the specified values.
// * .empty() allows the field to be empty, meaning it can be omitted from the request body.
// * .default("anonymous") sets a default value of "anonymous" if field is not provided.
// * .trim() removes any leading or trailing whitespace from the field.
// * .pattern(/^[a-zA-Z0-9]+$/) ensures that the field contains only alphanumeric characters.
// * .toLowerCase() converts the field value to lowercase.

// ? email validation using Joi
// * joi.string().email() is used to validate that the field is a valid email address.
// * .email([ minDomainSegments : 2, maxDomainSegments : 4 ]) allows you to specify the minimum and maximum number of segments in the domain part of the email address.
// * .email({ tlds: { allow: [ "com", "net" ] } }) allows you to specify whether to allow top-level domains (TLDs) or not.
// * .email({ ignoreLength: true }) ignores the length of the email address.

// ? password validation using Joi
// * joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/) is used to validate that the password meets certain criteria
// * that include at least one digit, one lowercase letter, one uppercase letter, and a minimum length of 8 characters.

// ? confirm password validation using Joi
// * joi.ref("password") is used to reference another field in the schema, ensuring that the confirm password matches the original password.

// ? gender validation using Joi
// * joi.string().valid("male", "female") is used to validate that the gender field is either "male" or "female".

// ? age validation using Joi
// * joi.number().min(18).max(100).positive().integer() is used to validate that the age field is a positive integer between 18 and 100.
// * .positive() ensures that the age is a positive number.
// * .integer() ensures that the age is an integer.

// ? isVerified validation using Joi
// * joi.boolean().default(false) is used to validate that the isVerified field is a boolean value, defaulting to false if not provided.
// * .sensitive(true) ensures that the field is case-sensitive .
// * .truthy(1) that the field is a truthy value, meaning it can be true or 1.
// * .falsy(0) ensures that the field is a falsy value, meaning it can be false or 0.

// ? date validation using Joi
// * joi.date().less("now") is used to validate that the date field is a valid date and is less than the current date.
// * .greater("now") ensures that the date is greater than the current date.
// * .iso() ensures that the date is in ISO format.
// * .timestamp() ensures that the date is in timestamp format.
// * format of the date in joi is ("mm/dd/yyyy") ensures that the date is in the specified format.

// ? array validation using Joi
// * joi.array().items(joi.string().valid("apple", "banana", "orange")) is used to validate that the field is an array containing only specific string values.
// * .min(1) ensures that the array contains at least one item.
// * .max(5) ensures that the array contains at most five items.
// * .unique() ensures that the items in the array are unique.
// * .sparse(true) allows the array to have sparse items, meaning some items can be empty or undefined.
// * .length(3) ensures that the array has exactly three items.
// * .ordered() ensures that the items in the array are in a specific order and length.
// * .sorted() ensures that the items in the array are sorted in ascending order.

// ? messages in Joi
// * .messages({ "string.min": "Custom error message for min length" }) allows you to customize the error messages for validation failures.

// ? dynamic message validation using Joi 
// * joi.string().min(3).messages({"string.min": `User Name must be at least {#limit} characters and you entered {#value.length} characters`)})

