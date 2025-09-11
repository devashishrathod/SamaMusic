exports.validateRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden: You do not have permission to perform this action.",
      });
    }
    next();
  };
};
