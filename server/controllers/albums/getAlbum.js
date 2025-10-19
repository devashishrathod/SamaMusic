const { asyncWrapper, sendSuccess } = require("../../utils");
const { getAlbumById } = require("../../services/albums");

exports.getAlbum = asyncWrapper(async (req, res) => {
  const album = await getAlbumById(req.params?.id);
  return sendSuccess(res, 200, "Album fetched successfully", album);
});
