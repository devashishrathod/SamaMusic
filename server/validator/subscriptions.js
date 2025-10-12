const Joi = require("joi");
const { SUBSCRIPTION_TYPES } = require("../constants");

exports.validateCreateSubscription = (data) => {
  const createSchema = Joi.object({
    name: Joi.string().trim().min(3).max(120).required().messages({
      "string.min": "Name has minimum {#limit} characters",
      "string.max": "Name cannot exceed {#limit} characters",
    }),
    description: Joi.string().allow("").max(500).messages({
      "string.max": "Description cannot exceed {#limit} characters",
    }),
    price: Joi.number().min(0).required().messages({
      "string.min": "Price must be at least {#limit}",
      "any.required": "Price is required",
    }),
    type: Joi.string()
      .valid(...Object.values(SUBSCRIPTION_TYPES))
      .required(),
    durationInDays: Joi.number().optional(),
    benefits: Joi.array().items(Joi.string()).optional(),
    limitations: Joi.array().items(Joi.string()).optional(),
    isActive: Joi.boolean().optional(),
  });
  return createSchema.validate(data);
};
