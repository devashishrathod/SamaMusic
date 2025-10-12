const { createSubCategory } = require("./createSubCategory");
const { getAllSubCategories } = require("./getAllSubCategories");
const { getSubCategoryById } = require("./getSubCategoryById");
const { updateSubCategoryById } = require("./updateSubCategoryById");
const { deleteSubCategoryById } = require("./deleteSubCategoryById");

module.exports = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategoryById,
  deleteSubCategoryById,
};
