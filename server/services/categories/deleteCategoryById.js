const Category = require("../../models/Category");
const { throwError, validateObjectId } = require("../../utils");
const { deleteImage } = require("../uploads");

exports.deleteCategoryById = async (id) => {
  validateObjectId(id, "Category Id");
  const category = await Category.findById(id);
  if (!category || category.isDeleted) throwError(404, "Category not found");
  await deleteImage(category?.image);
  category.isDeleted = true;
  category.isActive = false;
  category.updatedAt = new Date();
  await category.save();
  return;
};
