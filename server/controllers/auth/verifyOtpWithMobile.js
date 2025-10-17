const User = require("../../models/User");
const { ROLES, LOGIN_TYPES } = require("../../constants");
const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { verifyOtpToMobile } = require("../../helpers/twoFactor");

exports.verifyOtpWithMobile = asyncWrapper(async (req, res) => {
  let { sessionId, otp, mobile, role, fcmToken, loginType, currentScreen } =
    req.body;
  if (!sessionId || !otp || !mobile) {
    throwError(422, "Please fill all required fields");
  }
  role = role?.toLowerCase() || ROLES.USER;
  loginType = loginType?.toLowerCase() || LOGIN_TYPES.MOBILE;
  currentScreen = currentScreen?.toUpperCase();
  let user = await User.findOne({ mobile, role, isDeleted: false }).select(
    "-password"
  );
  if (!user) throwError(404, "User not found with this mobile number");
  let result = await verifyOtpToMobile(sessionId, otp);
  if (result?.Status == "Success") {
    user.loginType = loginType;
    user.isMobileVerified = true;
    user.isLoggedIn = true;
    user.isOnline = true;
    if (currentScreen) user.currentScreen = currentScreen;
    if (fcmToken) user.fcmToken = fcmToken;
    user = await user.save();
    const token = user.getSignedJwtToken();
    return sendSuccess(res, 200, "OTP Verification successful", {
      user,
      token,
    });
  } else {
    return res.status(400).json({ success: false, msg: "Invalid OTP" });
  }
});
