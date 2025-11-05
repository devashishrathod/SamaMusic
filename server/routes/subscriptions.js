const express = require("express");
const router = express.Router();

const { isAdmin, verifyJwtToken } = require("../middlewares");
const { create, getAll } = require("../controllers/subscriptions");

router.post("/add", isAdmin, create);
router.get("/getAll", verifyJwtToken, getAll);

module.exports = router;
