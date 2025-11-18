const { asyncWrapper, sendSuccess } = require("../../utils");
const { getMusic } = require("../../services/musics");

exports.get = asyncWrapper(async (req, res) => {
  const music = await getMusic(req.params?.id);
  return sendSuccess(res, 200, "Music fetched successfully", music);
});
