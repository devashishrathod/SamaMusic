const mongoose = require("mongoose");
const { throwError } = require("./CustomError");

/**
 * Validates a MongoDB ObjectId.
 * @param {string} id - The ID to validate.
 * @param {string} [label="ID"] - Optional label for error message context.
 * @throws Will throw an error if the ID is invalid.
 */
exports.validateObjectId = (id, label = "ID") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throwError(422, `Invalid ${label}`);
  }
  return true;
};
