const { sendLoginOtpMail } = require("./sendLoginOtpMail");
const {
  sendOtpVerificationSuccessMail,
} = require("./sendOtpVerificationSuccessMail");

module.exports = { sendLoginOtpMail, sendOtpVerificationSuccessMail };
