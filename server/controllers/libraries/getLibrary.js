const { asyncWrapper, sendSuccess } = require("../../utils");
const { getLibraryById } = require("../../services/libraries");

exports.getLibrary = asyncWrapper(async (req, res) => {
  const library = await getLibraryById(req.params?.id);
  return sendSuccess(res, 200, "Library fetched successfully", library);
});
