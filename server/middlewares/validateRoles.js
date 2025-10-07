const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ROLES } = require("../constants");
const { getUserById } = require("../services/users");
const { throwError, asyncWrapper } = require("../utils");

const validateRoles = (...allowedRoles) =>
  asyncWrapper(async (req, res, next) => {
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
    if (!allowedRoles.includes(user.role)) {
      throwError(
        403,
        "Forbidden: You do not have permission to perform this action."
      );
    }
    next();
  });

const isAdmin = validateRoles(ROLES.ADMIN);
const isUser = validateRoles(ROLES.USER);

module.exports = {
  validateRoles,
  isAdmin,
  isUser,
};
