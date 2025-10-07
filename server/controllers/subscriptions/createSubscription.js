const { asyncWrapper, sendSuccess, throwError } = require("../../utils");
const { validateCreateSubscription } = require("../../validator/subscriptions");
const { createSubscription } = require("../../services/subscriptions");

exports.createSubscription = asyncWrapper(async (req, res) => {
  const { error } = validateCreateSubscription(req.body);
  if (error) throwError(422, error.details.map((d) => d.message).join(", "));
  const subscription = await createSubscription(req.body);
  return sendSuccess(res, 201, "Subscription created", subscription);
});
