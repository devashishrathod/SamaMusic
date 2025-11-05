const Subscription = require("../../models/Subscription");
const { computeDuration } = require("../../helpers/subscriptions");
const { throwError } = require("../../utils");

exports.createSubscription = async (payload) => {
  let { name, description, price, type, benefits, limitations, isActive } =
    payload;
  name = name?.trim().toLowerCase();
  type = type?.trim().toLowerCase();
  if (!type) throwError(400, "Subscription type is required");
  const existingSubscription = await Subscription.findOne({
    name,
    type,
    isDeleted: false,
  });
  if (existingSubscription)
    throwError(
      409,
      `Subscription with this name for ${type} plan already exists`
    );
  const durationInDays = computeDuration(type);
  description = description?.trim().toLowerCase();
  price = parseFloat(price);
  benefits = benefits?.map((benefit) => benefit?.trim().toLowerCase());
  limitations = limitations?.map((limitation) =>
    limitation?.trim().toLowerCase()
  );
  return await Subscription.create({
    name,
    description,
    price,
    type,
    durationInDays,
    benefits,
    limitations,
    isActive,
  });
};
