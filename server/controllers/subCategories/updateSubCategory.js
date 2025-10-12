const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { updateSubCategoryById } = require("../../services/subCategories");
const { validateUpdateSubCategory } = require("../../validator/subCategories");

exports.updateSubCategory = asyncWrapper(async (req, res) => {
  const image = req.files?.image;
  const { error } = validateUpdateSubCategory(req.body);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const updated = await updateSubCategoryById(req.params?.id, req.body, image);
  return sendSuccess(res, 200, "Sub-category updated", updated);
});
