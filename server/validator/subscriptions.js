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
    benefits: Joi.array().items(Joi.string()).optional(),
    limitations: Joi.array().items(Joi.string()).optional(),
    isActive: Joi.boolean().optional(),
  });
  return createSchema.validate(data, { abortEarly: false });
};

exports.validateGetAllSubscriptionsQuery = (payload) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    search: Joi.string().optional(),
    name: Joi.string().optional(),
    price: Joi.number().min(0).optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional(),
    isActive: Joi.alternatives().try(Joi.string(), Joi.boolean()).optional(),
    type: Joi.string().optional(),
    fromDate: Joi.date().iso().optional(),
    toDate: Joi.date().iso().optional(),
    sortBy: Joi.string()
      .valid("price", "createdAt", "name", "durationInDays")
      .optional(),
    sortOrder: Joi.string().valid("asc", "desc").optional(),
  });
  return schema.validate(payload, { abortEarly: false });
};
