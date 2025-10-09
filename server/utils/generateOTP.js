const crypto = require("node:crypto");

exports.generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};
