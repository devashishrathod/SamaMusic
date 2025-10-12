const { asyncWrapper, sendSuccess } = require("../../utils");
const { deleteSubCategoryById } = require("../../services/subCategories");

exports.deleteSubCategory = asyncWrapper(async (req, res) => {
  await deleteSubCategoryById(req.params?.id);
  return sendSuccess(res, 200, "Sub-category deleted successfully");
});
