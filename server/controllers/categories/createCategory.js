const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { createCategory } = require("../../services/categories");
const { validateCreateCategory } = require("../../validator/categories");

exports.createCategory = asyncWrapper(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const image = req.files?.image;
  const category = await createCategory(req.body, image);
  return sendSuccess(res, 201, "Category created", category);
});
