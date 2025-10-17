const User = require("../../models/User");
const { ROLES, LOGIN_TYPES } = require("../../constants");
const { asyncWrapper, sendSuccess, throwError } = require("../../utils");

exports.register = asyncWrapper(async (req, res) => {
  let { name, email, password, mobile, role, loginType, fcmToken } = req.body;
  if (!mobile && !email) {
    throwError(422, "Email or Mobile number any one of this is required");
  }
  email = email?.toLowerCase();
  name = name?.toLowerCase();
  role = role?.toLowerCase() || ROLES.USER;
  loginType = loginType?.toLowerCase() || LOGIN_TYPES.PASSWORD;
  let user;
  if (email) {
    user = await User.findOne({ email, role, isDeleted: false });
    if (user) throwError(400, "User with this email already exists");
  }
  if (mobile) {
    user = await User.findOne({ mobile, role, isDeleted: false });
    if (user) throwError(400, "User with mobile number already exists");
  }
  const userData = {
    name,
    password,
    email,
    mobile,
    role,
    fcmToken,
    loginType,
    isLoggedIn: true,
    isOnline: true,
  };
  user = await User.create(userData);
  const token = user.getSignedJwtToken();
  return sendSuccess(res, 201, "User registered successfully", { user, token });
});
