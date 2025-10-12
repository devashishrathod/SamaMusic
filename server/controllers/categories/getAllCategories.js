const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { getAllCategories } = require("../../services/categories");
const { validateGetAllCategoriesQuery } = require("../../validator/categories");

exports.getAllCategories = asyncWrapper(async (req, res) => {
  const { error } = validateGetAllCategoriesQuery(req.query);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const result = await getAllCategories(req.query);
  return sendSuccess(res, 200, "Categories fetched", result);
});
