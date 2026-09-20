export const validationMiddlewareCustom = (schema) => {
  return (req, res, next) => {
    const validationErrors = [];

    for (const key of Object.keys(schema)) {
      const result = schema[key].validate(req[key], { abortEarly: false });
      if (result.error) {
        result.error.details.forEach((err) => {
          validationErrors.push({
            field: err.context.label,
            message: err.message,
          });
        });
      }
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation Error",
        errors: validationErrors,
      });
    }

    next();
  };
};

export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const requestData = { ...req.body, ...req.params };

    if (req.headers["authorization"]) {
      requestData.authorization = req.headers["authorization"];
    }

    const result = schema.validate(requestData, { abortEarly: false });
    if (result.error) {
      return res.status(400).json({
        message: "Validation Error",
        errors: result.error.details.map((err) => {
          return {
            field: err.context.label,
            message: err.message,
            type: err.type,
          };
        }),
      });
    }
    next();
  };
};
