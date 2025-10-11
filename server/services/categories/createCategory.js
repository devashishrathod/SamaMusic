const Category = require("../../models/Category");
const { throwError } = require("../../utils");
const { uploadImage } = require("../uploads");

exports.createCategory = async (payload, image) => {
  let { name, description } = payload;
  name = name?.toLowerCase();
  const existingCategory = await Category.findOne({
    name: name,
    isDeleted: false,
  });
  if (existingCategory) {
    throwError(400, "Category already exist with this name");
  }
  let imageUrl;
  if (image) imageUrl = await uploadImage(image.tempFilePath);
  const newCategory = await Category.create({
    name,
    description: description?.toLowerCase(),
    image: imageUrl,
  });
  return newCategory;
};
