const User = require("../../models/User");
const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { sendOtpVerificationSuccessMail } = require("../../helpers/nodeMailer");
const { ROLES, LOGIN_TYPES } = require("../../constants");

exports.verifyOtpWithEmail = asyncWrapper(async (req, res) => {
  let { otp, email, role, fcmToken, loginType, currentScreen } = req.body;
  email = email?.toLowerCase();
  role = role?.toLowerCase() || ROLES.USER;
  loginType = loginType?.toLowerCase() || LOGIN_TYPES.EMAIL;
  currentScreen = currentScreen?.toUpperCase();
  let user = await User.findOne({ email, role, isDeleted: false }).select(
    "-password"
  );
  if (!user) throwError(404, "User not found with this email");
  if (!user.otp || !user.otp.code) throwError(404, "OTP not found");
  const isExpired = new Date() > user?.otp?.expiresAt;
  if (isExpired) throwError(410, "OTP expired");
  if (user.otp.code !== otp) throwError(403, "Invalid OTP");
  user.otp = undefined;
  user.loginType = loginType;
  user.isEmailVerified = true;
  user.isLoggedIn = true;
  user.isOnline = true;
  if (currentScreen) user.currentScreen = currentScreen;
  if (fcmToken) user.fcmToken = fcmToken;
  user = await user.save();
  const token = user.getSignedJwtToken();
  sendOtpVerificationSuccessMail(email);
  return sendSuccess(res, 200, "OTP Verification successful", { user, token });
});
