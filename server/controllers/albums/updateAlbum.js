const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { updateAlbumById } = require("../../services/albums");
const { validateUpdateAlbum } = require("../../validator/albums");

exports.updateAlbum = asyncWrapper(async (req, res) => {
  const { error } = validateUpdateAlbum(req.body);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const image = req.files?.image;
  const updated = await updateAlbumById(req.params?.id, req.body, image);
  return sendSuccess(res, 200, "Album updated", updated);
});
