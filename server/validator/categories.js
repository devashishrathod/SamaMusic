const Joi = require("joi");

exports.validateCreateCategory = (data) => {
  const createSchema = Joi.object({
    name: Joi.string().min(3).max(120).required().messages({
      "string.min": "Name has minimum {#limit} characters",
    }),
    description: Joi.string().allow("").max(300).messages({
      "string.max": "Description cannot exceed {#limit} characters",
    }),
    isActive: Joi.boolean().optional(),
  });
  return createSchema.validate(data);
};

// const updateCategory = Joi.object({
//   name: Joi.string().min(1).max(120).optional(),
//   description: Joi.string().allow("").max(2000).optional(),
//   isActive: Joi.boolean().optional(),
// });

// const getAllQuery = Joi.object({
//   page: Joi.number().integer().min(1).default(1),
//   limit: Joi.number().integer().min(1).max(200).default(20),
//   sortBy: Joi.string().optional(), // e.g. "name:asc" or "createdAt:desc"
//   search: Joi.string().allow("").optional(),
//   isActive: Joi.boolean().optional(),
//   startDate: Joi.date().iso().optional(),
//   endDate: Joi.date().iso().optional(),
//   name: Joi.string().optional(),
//   description: Joi.string().optional(),
// });
