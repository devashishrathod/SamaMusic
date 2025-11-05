const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { createMusic } = require("../../services/musics");
const { validateCreateMusic } = require("../../validator/musics");

exports.create = asyncWrapper(async (req, res) => {
  const { error, value } = validateCreateMusic(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const image = req.files?.image;
  const audio = req.files?.audio;
  const music = await createMusic(value, image, audio);
  return sendSuccess(res, 201, "Music created successfully", music);
});
