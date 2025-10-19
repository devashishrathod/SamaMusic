const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { getAllAlbums } = require("../../services/albums");
const { validateGetAllAlbumsQuery } = require("../../validator/albums");

exports.getAllAlbums = asyncWrapper(async (req, res) => {
  const { error } = validateGetAllAlbumsQuery(req.query);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const allAlbums = await getAllAlbums(req.query);
  return sendSuccess(res, 200, "Albums fetched successfully", allAlbums);
});
