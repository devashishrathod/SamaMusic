const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middlewares");
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

router.post("/create", isAdmin, createCategory);
router.get("/getAll", getAllCategories);
router.get("/get/:id", getCategory);
router.put("/update/:id", isAdmin, updateCategory);
router.delete("/delete/:id", isAdmin, deleteCategory);

module.exports = router;
