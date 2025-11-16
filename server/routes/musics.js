const express = require("express");
const router = express.Router();

const { isAdmin, verifyJwtToken } = require("../middlewares");
const { create, getAll } = require("../controllers/musics");

router.post("/add", isAdmin, create);
router.get("/getAll", getAll);

module.exports = router;
