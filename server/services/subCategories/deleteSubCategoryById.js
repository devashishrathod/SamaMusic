const SubCategory = require("../../models/SubCategory");
const { throwError, validateObjectId } = require("../../utils");
const { deleteImage } = require("../uploads");

exports.deleteSubCategoryById = async (id) => {
  validateObjectId(id, "SubCategory Id");
  const subCategory = await SubCategory.findById(id);
  if (!subCategory || subCategory.isDeleted) {
    throwError(404, "subCategory not found");
  }
  await deleteImage(subCategory?.image);
  subCategory.image = null;
  subCategory.isDeleted = true;
  subCategory.isActive = false;
  subCategory.updatedAt = new Date();
  await subCategory.save();
  return;
};
