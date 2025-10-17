require("dotenv").config();
var axios = require("axios");
const { throwError } = require("../../utils");
const APIKEY = process.env.TWO_FACTOR_API_KEY;

exports.verifyOtpToMobile = async (sessionId, otp) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://2factor.in/API/V1/${APIKEY}/SMS/VERIFY/${sessionId}/${otp}`,
      headers: {},
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("error on verify Otp with mobile number", error);
    throwError(500, error.message || "error on verify Otp with mobile number");
  }
};
