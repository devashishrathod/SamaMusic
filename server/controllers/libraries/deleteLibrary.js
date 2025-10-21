const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteLibraryById } = require("../../services/libraries");

exports.deleteLibrary = asyncWrapper(async (req, res) => {
  const userId = req.userId;
  await deleteLibraryById(userId, req.params?.id);
  return sendSuccess(res, 200, "Library deleted successfully");
});
