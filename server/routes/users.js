const express = require("express");
const router = express.Router();

const { getUser } = require("../controllers/users");
const { verifyJwtToken } = require("../middlewares");

router.get("/get", verifyJwtToken, getUser);

module.exports = router;
