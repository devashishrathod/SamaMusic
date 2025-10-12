const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { getAllSubCategories } = require("../../services/subCategories");
const {
  validateGetAllSubCategoriesQuery,
} = require("../../validator/subCategories");

exports.getAllSubCategories = asyncWrapper(async (req, res) => {
  const { error } = validateGetAllSubCategoriesQuery(req.query);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const result = await getAllSubCategories(req.query);
  return sendSuccess(res, 200, "Sub-categories fetched", result);
});
