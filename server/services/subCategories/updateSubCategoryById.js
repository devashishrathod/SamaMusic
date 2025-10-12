const SubCategory = require("../../models/SubCategory");
const Category = require("../../models/Category");
const { throwError, validateObjectId } = require("../../utils");
const { uploadImage, deleteImage } = require("../uploads");

exports.updateSubCategoryById = async (id, payload, image) => {
  validateObjectId(id, "SubCategory Id");
  const subcategory = await SubCategory.findById(id);
  if (!subcategory || subcategory.isDeleted) {
    throwError(404, "SubCategory not found");
  }
  if (payload) {
    let { name, description, categoryId, isActive } = payload;
    let category;
    if (categoryId) {
      validateObjectId(categoryId, "Category Id");
      category = await Category.findById(categoryId);
      if (!category || category.isDeleted) {
        throwError(404, "Category not found!");
      }
      subcategory.categoryId = categoryId;
    }
    if (name) {
      name = name.toLowerCase();
      const existingSubCategorywithCategory = await SubCategory.findOne({
        _id: { $ne: id },
        name,
        categoryId: subcategory?.categoryId,
        isDeleted: false,
      });
      if (existingSubCategorywithCategory) {
        throwError(
          400,
          `Another Subcategory exists with this name for same category`
        );
      }
      subcategory.name = name;
    }
    if (name && categoryId) {
      const existingSubCategorywithCategory = await SubCategory.findOne({
        _id: { $ne: id },
        name,
        categoryId,
        isDeleted: false,
      });
      if (existingSubCategorywithCategory) {
        throwError(
          400,
          `Another Subcategory exists with this name for ${category.name}`
        );
      }
    }
    if (typeof isActive !== "undefined") {
      subcategory.isActive = !subcategory.isActive;
    }
    if (description) subcategory.description = description?.toLowerCase() || "";
  }
  if (image) {
    if (subcategory.image) await deleteImage(subcategory.image);
    const imageUrl = await uploadImage(image.tempFilePath);
    subcategory.image = imageUrl;
  }
  subcategory.updatedAt = new Date();
  await subcategory.save();
  return subcategory;
};
