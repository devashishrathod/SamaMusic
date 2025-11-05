const {
  asyncWrapper,
  sendSuccess,
  throwError,
  cleanJoiError,
} = require("../../utils");
const { validateCreateSubscription } = require("../../validator/subscriptions");
const { createSubscription } = require("../../services/subscriptions");

exports.create = asyncWrapper(async (req, res) => {
  const { error } = validateCreateSubscription(req.body);
  if (error) throwError(422, cleanJoiError(error));
  const subscription = await createSubscription(req.body);
  return sendSuccess(res, 201, "Subscription created", subscription);
});
