export default function handleErrors(error, res) {
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = error?.errors?.map((err) => {
      return {
        field: err.path,
        message: err.message,
      };
    });
    return res.status(400).json({ message: "Validation error", errors });
  }
  return res
    .status(500)
    .json({ message: "Internal server error", error, msg: error.message });
}
