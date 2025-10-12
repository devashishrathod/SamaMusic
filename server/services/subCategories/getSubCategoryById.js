const SubCategory = require("../../models/SubCategory");
const { throwError, validateObjectId } = require("../../utils");

exports.getSubCategoryById = async (id) => {
  validateObjectId(id, "SubCategory Id");
  const subcategory = await SubCategory.findById(id);
  if (!subcategory || subcategory.isDeleted) {
    throwError(404, "SubCategory not found");
  }
  return subcategory;
};
