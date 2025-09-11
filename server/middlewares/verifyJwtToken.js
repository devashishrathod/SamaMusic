const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { getUserById } = require("../service/userServices");

exports.verifyJwtToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  try {
    if (!token) {
      return res.status(401).json({ msg: "Access Denied!", success: false });
    }
    let splitToken = token.split(" ")[1];
    if (!splitToken) {
      return res.status(401).json({ msg: "Access Denied!", success: false });
    }
    const decodedToken = jwt.verify(splitToken, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ msg: "Access Denied!", success: false });
    }
    const checkUser = await getUserById(decodedToken?._id);
    if (checkUser) {
      req.payload = checkUser;
      next();
    } else {
      return res.status(401).json({ msg: "Access Denied!", success: false });
    }
  } catch (error) {
    console.log("error on auth: ", error);
    return res.status(500).json({ err: error.message, error, success: false });
  }
};
