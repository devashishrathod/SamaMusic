const express = require("express");
const router = express.Router();

const {
  register,
  login,
  loginOrSignInWithEmail,
  verifyOtpWithEmail,
  loginOrSignInWithMobile,
  verifyOtpWithMobile,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/loginOrSignin-with-email", loginOrSignInWithEmail);
router.put("/verify-otp-email", verifyOtpWithEmail);
router.post("/loginOrSignin-with-mobile", loginOrSignInWithMobile);
router.put("/verify-otp-mobile", verifyOtpWithMobile);

module.exports = router;
