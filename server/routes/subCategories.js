const express = require("express");
const router = express.Router();

const { isAdmin, verifyJwtToken } = require("../middlewares");
const {
  createSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategories");

router.post("/:categoryId/create", isAdmin, createSubCategory);
router.get("/getAll", verifyJwtToken, getAllSubCategories);
router.get("/get/:id", verifyJwtToken, getSubCategory);
router.put("/update/:id", isAdmin, updateSubCategory);
router.delete("/delete/:id", isAdmin, deleteSubCategory);

module.exports = router;
