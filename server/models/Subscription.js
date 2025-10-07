const mongoose = require("mongoose");
const { SUBSCRIPTION_TYPES } = require("../constants");

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    type: {
      type: String,
      enum: Object.values(SUBSCRIPTION_TYPES),
      required: true,
    },
    durationInDays: { type: Number },
    benefits: { type: [String], default: [] },
    limitations: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
