const Joi = require("joi");
const objectId = require("./validJoiObjectId");
const { throwError } = require("../utils");

exports.validateCreateMusic = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(120).required().messages({
      "string.min": "Title has minimum {#limit} characters",
      "string.max": "Title cannot exceed {#limit} characters",
    }),
    description: Joi.string().allow("").max(300).messages({
      "string.max": "Description cannot exceed {#limit} characters",
    }),
    artists: Joi.alternatives()
      .required()
      .try(
        Joi.array().items(Joi.string().min(3).max(120)).required(),
        Joi.string()
          .min(3)
          .max(120)
          .custom((value) => [value])
      )
      .custom((value) => {
        if (typeof value === "string") return [value];
        if (Array.isArray(value)) return value;
        if (value && !Array.isArray(value))
          throwError(422, "Artists is required");
      })
      .messages({
        "any.required": "Artists is required",
        "string.min": "Artist name must have at least {#limit} characters",
        "string.max": "Artist name cannot exceed {#limit} characters",
        "array.base": "Artists must be an array or string",
      }),
    albumId: objectId()
      .messages({
        "any.invalid": "Invalid albumId format",
      })
      .required(),
    subCategoryId: objectId()
      .messages({
        "any.invalid": "Invalid subCategoryId format",
      })
      .required(),
    releaseDate: Joi.date().optional(),
    durationInSeconds: Joi.number().min(0).optional().messages({
      "number.min": "Duration in seconds cannot be negative",
    }),
    isActive: Joi.boolean().optional(),
  });
  return schema.validate(data, { abortEarly: false });
};
