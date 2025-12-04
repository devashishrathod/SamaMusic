const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { updateMusic } = require("../../services/musics");
const { validateUpdateMusic } = require("../../validator/musics");

exports.update = asyncWrapper(async (req, res) => {
  const { error, value } = validateUpdateMusic(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const image = req.files?.image;
  const audio = req.files?.audio;
  const updated = await updateMusic(req.params?.id, value, image, audio);
  return sendSuccess(res, 200, "Music updated successfully", updated);
});
