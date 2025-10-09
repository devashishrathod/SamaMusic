const express = require("express");
const router = express.Router();

const {
  register,
  login,
  loginWithEmail,
  verifyOtpWithEmail,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/login-with-email", loginWithEmail);
router.put("/verify-otp", verifyOtpWithEmail);

module.exports = router;
