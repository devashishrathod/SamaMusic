const Category = require("../../models/Category");
const { throwError, validateObjectId } = require("../../utils");

exports.getCategoryById = async (id) => {
  validateObjectId(id, "Category Id");
  const category = await Category.findById(id);
  if (!category || category.isDeleted) throwError(404, "Category not found");
  return category;
};
