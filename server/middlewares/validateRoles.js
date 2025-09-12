const { ROLES } = require("../constants");
const { throwError } = require("../utils");

exports.validateRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) throwError(404, "User not found");
    if (!allowedRoles.includes(user.role)) {
      throwError(
        403,
        "Forbidden: You do not have permission to perform this action."
      );
    }
    next();
  };
};

exports.isAdmin = this.validateRoles(ROLES.ADMIN);
exports.isUser = this.validateRoles(ROLES.USER);
