const express = require("express");
const router = express.Router();

const { isAdmin, verifyJwtToken } = require("../middlewares");
const { create } = require("../controllers/musics");

router.post("/add", isAdmin, create);

module.exports = router;
