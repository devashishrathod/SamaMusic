const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middlewares");
const { createCategory } = require("../controllers/categories");

router.post("/create", isAdmin, createCategory);

module.exports = router;
