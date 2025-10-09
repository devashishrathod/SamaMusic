const { register } = require("./register");
const { login } = require("./login");
const { loginWithEmail } = require("./loginWithEmail");
const { verifyOtpWithEmail } = require("./verifyOtpWithEmail");

module.exports = { register, login, loginWithEmail, verifyOtpWithEmail };
