const User = require("../../models/User");
const { ROLES } = require("../../constants");
const { asyncWrapper, sendSuccess, throwError } = require("../../utils");

exports.login = asyncWrapper(async (req, res) => {
  let { email, password, role } = req.body;
  role = role || ROLES.USER;
  const user = await User.findOne({
    email: email,
    role: role,
    isDeleted: false,
  }).select("+password");
  if (!user) throwError(400, "User not found for this email");
  const passwordMatch = await user.matchPassword(password);
  if (!passwordMatch) throwError(403, "Wrong password");
  const token = user.getSignedJwtToken();
  return sendSuccess(res, 200, "User Loggedin Successfully", { user, token });
});
