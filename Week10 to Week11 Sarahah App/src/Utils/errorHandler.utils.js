export const errorHandler = (fn) => {
  return async (req, res, next) => {
    fn(req, res).catch((err) => {
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
        stack: err.stack,
      });
    });
  };
};
