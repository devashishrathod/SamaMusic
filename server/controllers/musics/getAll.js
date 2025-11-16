const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { validateGetAllMusicsQuery } = require("../../validator/musics");
const { getAllMusics } = require("../../services/musics");

exports.getAll = asyncWrapper(async (req, res) => {
  const { error, value } = validateGetAllMusicsQuery(req.query);
  if (error) throwError(422, cleanJoiError(error));
  const result = await getAllMusics(value);
  return sendSuccess(res, 200, "Music fetched successfully", result);
});
