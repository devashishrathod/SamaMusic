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
  console.log(passwordMatch, "pp", !passwordMatch);
  if (!passwordMatch) throwError(403, "Wrong password");
  const token = user.getSignedJwtToken({
    expiresIn: "7d",
    secret: process.env.JWT_SECRET,
  });
  //   const token = jwt.sign(
  //     { _id: userData._id, role: userData.role },
  //     process.env.JWT_SECRET,
  //     { expiresIn: "7d" }
  //   );
  //   await userData.save();
  return sendSuccess(res, 200, "User Loggedin Successfully", { user, token });
});
