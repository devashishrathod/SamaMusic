const Category = require("../../models/Category");
const SubCategory = require("../../models/SubCategory");
const { throwError } = require("../../utils");
const { uploadImage } = require("../uploads");

exports.createSubCategory = async (categoryId, payload, image) => {
  const category = await Category.findById(categoryId);
  if (!category || category.isDeleted) throwError(404, "Category not found!");
  let { name, description, isActive } = payload;
  name = name?.toLowerCase();
  description = description?.toLowerCase();
  const existingSubCategory = await SubCategory.findOne({
    name: name,
    categoryId: categoryId,
    isDeleted: false,
  });
  if (existingSubCategory) {
    throwError(
      400,
      `SubCategory already exist with this name for ${category.name} category`
    );
  }
  let imageUrl;
  if (image) imageUrl = await uploadImage(image.tempFilePath);
  const newSubCategory = await SubCategory.create({
    name,
    description,
    categoryId,
    image: imageUrl,
    isActive,
  });
  return newSubCategory;
};
