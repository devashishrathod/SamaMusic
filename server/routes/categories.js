const express = require("express");
const router = express.Router();

// const { isAdmin, verifyJwtToken } = require("../middlewares");
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

router.post("/create", createCategory); //isAdmin,
router.get("/getAll", getAllCategories); // verifyJwtToken,
router.get("/get/:id", getCategory); //  verifyJwtToken,
router.put("/update/:id", updateCategory); //isAdmin,
router.delete("/delete/:id", deleteCategory); //isAdmin,

module.exports = router;
