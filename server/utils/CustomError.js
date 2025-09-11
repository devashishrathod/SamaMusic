class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const throwError = (statusCode, message) => {
  throw new CustomError(statusCode, message);
};

module.exports = { throwError, CustomError };
