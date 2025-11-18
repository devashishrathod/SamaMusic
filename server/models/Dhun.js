const mongoose = require("mongoose");
const { DEFAULT_IMAGES } = require("../constants");

const dhunSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    durationInSeconds: { type: Number },
    audio: { type: String, required: true },
    image: { type: String, default: DEFAULT_IMAGES.MUSIC },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Dhun", dhunSchema);
