const User = require("../../models/User");
const { ROLES } = require("../../constants");
const { asyncWrapper, sendSuccess, throwError } = require("../../utils");

exports.register = asyncWrapper(async (req, res) => {
  let { name, email, password, mobile, role, fcmToken } = req.body;
  role = role || ROLES.USER;
  const user = await User.findOne({
    email: email,
    role: role,
    isDeleted: false,
  });
  if (user) throwError(400, "User with this email already exists");
  const userData = {
    name,
    password,
    email,
    mobile,
    role,
    fcmToken,
  };
  const newUser = await User.create(userData);
  const token = newUser.getSignedJwtToken({
    expiresIn: "7d",
    secret: process.env.JWT_SECRET,
  });
  return sendSuccess(res, 201, "User registered successfully", {
    user: newUser,
    token,
  });
});
