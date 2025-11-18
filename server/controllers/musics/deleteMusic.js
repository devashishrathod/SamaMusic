const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteMusic } = require("../../services/musics");

exports.deleteMusic = asyncWrapper(async (req, res) => {
  await deleteMusic(req.params?.id);
  return sendSuccess(res, 200, "Music deleted successfully");
});
