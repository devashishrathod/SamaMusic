const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteAlbumById } = require("../../services/albums");

exports.deleteAlbum = asyncWrapper(async (req, res) => {
  await deleteAlbumById(req.params?.id);
  return sendSuccess(res, 200, "Album deleted successfully");
});
