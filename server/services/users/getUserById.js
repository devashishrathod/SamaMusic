const User = require("../../models/User");
const { throwError } = require("../../utils");

exports.getUserById = async (userId) => {
  const user = await User.findOne({ _id: userId, isDeleted: false }).select(
    "-password"
  );
  if (!user) throwError(404, "User not found");
  return user;
};
