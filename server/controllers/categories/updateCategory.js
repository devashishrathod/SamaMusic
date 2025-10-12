const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { updateCategoryById } = require("../../services/categories");
const { validateUpdateCategory } = require("../../validator/categories");

exports.updateCategory = asyncWrapper(async (req, res) => {
  const { error } = validateUpdateCategory(req.body);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const image = req.files?.image;
  const updated = await updateCategoryById(req.params?.id, req.body, image);
  return sendSuccess(res, 200, "Category updated", updated);
});
