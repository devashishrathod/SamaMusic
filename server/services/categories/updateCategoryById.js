const Category = require("../../models/Category");
const { throwError, validateObjectId } = require("../../utils");
const { uploadImage, deleteImage } = require("../uploads");

exports.updateCategoryById = async (id, payload = 0, image) => {
  validateObjectId(id, "Category Id");
  const category = await Category.findById(id);
  if (!category || category.isDeleted) throwError(404, "Category not found");
  if (payload) {
    let { name, description, isActive } = payload;
    if (typeof isActive !== "undefined") category.isActive = !category.isActive;
    if (name) {
      name = name.toLowerCase();
      const existing = await Category.findOne({
        _id: { $ne: id },
        name,
        isDeleted: false,
      });
      if (existing) throwError(400, "Another category exists with this name");
      category.name = name;
    }
    if (description) category.description = description?.toLowerCase() || "";
  }
  if (image) {
    if (category.image) await deleteImage(category.image);
    const imageUrl = await uploadImage(image.tempFilePath);
    category.image = imageUrl;
  }
  category.updatedAt = new Date();
  await category.save();
  return category;
};
