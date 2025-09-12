const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getUserById } = require("../services/users");
const { throwError, asyncWrapper } = require("../utils");

exports.verifyJwtToken = asyncWrapper(async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) throwError(401, "Access Denied! Missing authorized token");
  let splitToken = token.split(" ")[1];
  if (!splitToken) throwError(403, "Access Denied! Invalid authorized token");
  const decodedToken = jwt.verify(splitToken, process.env.JWT_SECRET);
  if (!decodedToken) throwError(403, "Access Denied! Wrong authorized token");
  const user = await getUserById(decodedToken?.id);
  if (!user) throwError(404, "Access Denied! User not found");
  req.userId = user?._id;
  req.role = user?.role;
  req.user = user;
  next();
});
