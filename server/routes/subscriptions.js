const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middlewares");
const { createSubscription } = require("../controllers/subscriptions");

router.post("/add", isAdmin, createSubscription);

module.exports = router;
