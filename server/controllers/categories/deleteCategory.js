const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteCategoryById } = require("../../services/categories");

exports.deleteCategory = asyncWrapper(async (req, res) => {
  await deleteCategoryById(req.params?.id);
  return sendSuccess(res, 200, "Category deleted successfully");
});
