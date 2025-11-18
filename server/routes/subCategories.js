const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middlewares");
const {
  createSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategories");

router.post("/:categoryId/create", isAdmin, createSubCategory);
router.get("/getAll", getAllSubCategories);
router.get("/get/:id", getSubCategory);
router.put("/update/:id", isAdmin, updateSubCategory);
router.delete("/delete/:id", isAdmin, deleteSubCategory);

module.exports = router;
