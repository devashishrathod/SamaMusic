const defaultPassword = process.env.DEFAULT_PASSWORD;
const User = require("../../models/User");
const { ROLES, LOGIN_TYPES } = require("../../constants");
const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { sendOtpToMobile } = require("../../helpers/twoFactor");

exports.loginOrSignInWithMobile = asyncWrapper(async (req, res) => {
  let { mobile, role, loginType } = req.body;
  if (!mobile) throwError(422, "Mobile number is required");
  role = role?.toLowerCase() || ROLES.USER;
  loginType = loginType?.toLowerCase() || LOGIN_TYPES.MOBILE;
  let isFirst = false;
  let user = await User.findOne({ mobile, role, isDeleted: false }).select(
    "+password"
  );
  if (!user) {
    isFirst = true;
    user = User.create({ mobile, role, loginType, password: defaultPassword });
  }
  const otpData = await sendOtpToMobile(mobile);
  console.log(otpData, "mcnmascmsa");
  return sendSuccess(
    res,
    200,
    "OTP has been sent to your Mobile. Please check your inbox.",
    { otpData, isFirst }
  );
});
