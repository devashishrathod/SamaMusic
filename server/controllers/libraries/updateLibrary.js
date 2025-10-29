const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { updateLibraryById } = require("../../services/libraries");
const { validateUpdateLibrary } = require("../../validator/libraries");

exports.updateLibrary = asyncWrapper(async (req, res) => {
  const { error } = validateUpdateLibrary(req.body);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const userId = req.userId;
  const image = req.files?.image;
  const updated = await updateLibraryById(
    userId,
    req.params?.id,
    req.body,
    image
  );
  return sendSuccess(res, 200, "Library updated successfully", updated);
});
