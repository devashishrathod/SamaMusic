const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { getAllSubscriptions } = require("../../services/subscriptions");
const {
  validateGetAllSubscriptionsQuery,
} = require("../../validator/subscriptions");

exports.getAll = asyncWrapper(async (req, res) => {
  const { error } = validateGetAllSubscriptionsQuery(req.query);
  if (error) throwError(422, cleanJoiError(error));
  const result = await getAllSubscriptions(req.query);
  return sendSuccess(res, 200, "Subscriptions fetched successfully", result);
});
