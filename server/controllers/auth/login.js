const User = require("../../models/User");
const { ROLES } = require("../../constants");
const { asyncWrapper, sendSuccess, throwError } = require("../../utils");

exports.login = asyncWrapper(async (req, res) => {
  let { email, password, role, fcmToken } = req.body;
  role = role || ROLES.USER;
  let user = await User.findOne({
    email: email,
    role: role,
    isDeleted: false,
  }).select("+password");
  if (!user) throwError(400, "User not found for this email");
  const passwordMatch = await user.matchPassword(password);
  if (!passwordMatch) throwError(403, "Wrong password");
  if (fcmToken) user.fcmToken = fcmToken;
  user = await user.save();
  const token = user.getSignedJwtToken();
  return sendSuccess(res, 200, "User Loggedin Successfully", { user, token });
});
