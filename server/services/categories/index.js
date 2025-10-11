const { createCategory } = require("./createCategory");
const { getAllCategories } = require("./getAllCategories");
const { getCategoryById } = require("./getCategoryById");
const { updateCategoryById } = require("./updateCategoryById");
const { deleteCategoryById } = require("./deleteCategoryById");

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
