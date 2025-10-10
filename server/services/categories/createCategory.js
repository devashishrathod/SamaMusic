const Category = require("../../models/Category");
const { throwError } = require("../../utils");

exports.createCategory = async (payload) => {
  let { name, description } = payload;
  name = name?.toLowerCase();
  const existingCategory = await Category.findOne({
    name: name,
    isDeleted: false,
  });
  if (existingCategory) {
    throwError(400, "Category already exist with this name");
  }
  const newCategory = await Category.create({
    name,
    description: description?.toLowerCase(),
  });
  return newCategory;
};
