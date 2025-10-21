const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { createLibrary } = require("../../services/libraries");
const { validateCreateLibrary } = require("../../validator/libraries");

exports.createLibrary = asyncWrapper(async (req, res) => {
  const { error } = validateCreateLibrary(req.body);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const userId = req.userId;
  const image = req.files?.image;
  const library = await createLibrary(userId, req.body, image);
  return sendSuccess(res, 201, "Library created successfully", library);
});
