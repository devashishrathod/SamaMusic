const {
  asyncWrapper,
  sendSuccess,
  throwError,
  validateObjectId,
} = require("../../utils");
const { createSubCategory } = require("../../services/subCategories");
const { validateCreateSubCategory } = require("../../validator/subCategories");

exports.createSubCategory = asyncWrapper(async (req, res) => {
  const categoryId = req.params?.categoryId;
  const image = req.files?.image;
  validateObjectId(categoryId, "category Id");
  const { error } = validateCreateSubCategory(req.body);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const subCategory = await createSubCategory(categoryId, req.body, image);
  return sendSuccess(res, 201, "Sub-category created", subCategory);
});
