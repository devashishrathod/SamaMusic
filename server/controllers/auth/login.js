const User = require("../../models/User");
const { ROLES, LOGIN_TYPES } = require("../../constants");
const { asyncWrapper, sendSuccess, throwError } = require("../../utils");

exports.login = asyncWrapper(async (req, res) => {
  let { email, password, role, fcmToken, type, loginType, mobile } = req.body;
  role = role?.toLowerCase() || ROLES.USER;
  loginType = loginType?.toLowerCase() || LOGIN_TYPES.PASSWORD;
  let user;
  if (type === LOGIN_TYPES.EMAIL) {
    if (!email) throwError(422, "Eamil is required");
    email = email?.toLowerCase();
    user = await User.findOne({ email, role, isDeleted: false }).select(
      "+password"
    );
    if (!user) throwError(404, "User not found with this email");
  } else {
    if (!mobile) throwError(422, "Mobile number is required");
    user = await User.findOne({ mobile, role, isDeleted: false }).select(
      "+password"
    );
    if (!user) throwError(404, "User not found with this mobile number");
  }
  const passwordMatch = await user.matchPassword(password);
  if (!passwordMatch) throwError(403, "Wrong password");
  if (fcmToken) user.fcmToken = fcmToken;
  user = await user.save();
  const token = user.getSignedJwtToken();
  return sendSuccess(res, 200, "User loggedin successfully", { user, token });
});
