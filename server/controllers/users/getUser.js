const { asyncWrapper, sendSuccess } = require("../../utils");
const { getUserById } = require("../../services/users");

exports.getUser = asyncWrapper(async (req, res) => {
  const userId = req.query.userId || req.userId;
  const user = await getUserById(userId);
  return sendSuccess(res, 200, "User fetched successfully", user);
});
