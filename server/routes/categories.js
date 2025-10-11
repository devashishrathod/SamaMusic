const express = require("express");
const router = express.Router();

const { isAdmin, verifyJwtToken } = require("../middlewares");
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

router.post("/create", isAdmin, createCategory);
router.get("/getAll", verifyJwtToken, getAllCategories);
router.get("/get/:id", verifyJwtToken, getCategory);
router.put("/update/:id", isAdmin, updateCategory);
router.delete("/delete/:id", isAdmin, deleteCategory);

module.exports = router;
