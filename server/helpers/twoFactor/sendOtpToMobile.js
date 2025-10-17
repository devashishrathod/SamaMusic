require("dotenv").config();
var axios = require("axios");
const { throwError } = require("../../utils");
const APIKEY = process.env.TWO_FACTOR_API_KEY;

exports.sendOtpToMobile = async (mobile) => {
  try {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://2factor.in/API/V1/${APIKEY}/SMS/${mobile}/AUTOGEN`,
      headers: {},
    };
    const response = await axios(config);
    console.log(`OTP sent to ${mobile}`, response?.data);
    return response?.data;
  } catch (error) {
    console.error("error on sending Otp to mobile", error);
    throwError(500, error.message || "error on sending Otp to mobile");
  }
};
