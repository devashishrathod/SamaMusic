const { CustomError, sendError } = require("../utils");

exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status =
    err instanceof CustomError ? err.statusCode : err.status || 500;
  const message = err.message || "Something went wrong";
  console.error("⛔ Error:", err);
  return sendError(res, status, message);
};
