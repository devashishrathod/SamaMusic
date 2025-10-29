const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { getAllLibraries } = require("../../services/libraries");
const { validateGetAllLibrariesQuery } = require("../../validator/libraries");

exports.getAllLibraries = asyncWrapper(async (req, res) => {
  const { error } = validateGetAllLibrariesQuery(req.query);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const libraryOwnerId = req.userId;
  const result = await getAllLibraries(libraryOwnerId, req.query);
  return sendSuccess(res, 200, "Libraries fetched successfully", result);
});
