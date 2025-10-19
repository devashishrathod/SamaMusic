const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { createAlbum } = require("../../services/albums");
const { validateCreateAlbum } = require("../../validator/albums");

exports.createAlbum = asyncWrapper(async (req, res) => {
  const { error } = validateCreateAlbum(req.body);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const image = req.files?.image;
  const album = await createAlbum(req.body, image);
  return sendSuccess(res, 201, "Album created successfully", album);
});
