const User = require("../../models/User");
const { ROLES, DEFAULT_PASSWORD } = require("../../constants");
const { asyncWrapper, sendSuccess, generateOTP } = require("../../utils");
const { sendLoginOtpMail } = require("../../helpers/nodeMailer");

exports.loginWithEmail = asyncWrapper(async (req, res) => {
  let { email, role } = req.body;
  role = role || ROLES.USER;
  const updatedData = {
    code: generateOTP(),
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  };
  let isFirst = false;
  let user = await User.findOne({
    email: email,
    role: role,
    isDeleted: false,
  }).select("+password");
  if (!user) {
    console.log(DEFAULT_PASSWORD, "gejjej");
    isFirst = true;
    user = User.create({
      email,
      role,
      password: DEFAULT_PASSWORD,
      otp: updatedData,
    });
  } else {
    user.otp = updatedData;
    user = await user.save();
  }
  sendLoginOtpMail(email, updatedData.code);
  return sendSuccess(
    res,
    200,
    "OTP has been sent to your Email. Please check your inbox."
  );
});
