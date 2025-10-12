const { asyncWrapper, sendSuccess } = require("../../utils");
const { getCategoryById } = require("../../services/categories");

exports.getCategory = asyncWrapper(async (req, res) => {
  const category = await getCategoryById(req.params?.id);
  return sendSuccess(res, 200, "Category fetched", category);
});
