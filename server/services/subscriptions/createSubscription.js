const Subscription = require("../../models/Subscription");
const { DURATION_MAP } = require("../../constants");
const { throwError } = require("../../utils");

const computeDuration = (type) => {
  const days = DURATION_MAP[type];
  if (!days)
    throwError(400, "Invalid subscription type for duration calculation");
  return days;
};

exports.createSubscription = async (payload) => {
  if (!payload.type) throwError(400, "Subscription type is required");
  payload.durationInDays = computeDuration(payload?.type);
  const existing = await Subscription.findOne({
    name: payload?.name,
    type: payload?.type,
    isDeleted: false,
  });
  if (existing)
    throwError(
      409,
      `Subscription with this name for ${payload.type} plan already exists`
    );
  return await Subscription.create(payload);
};
