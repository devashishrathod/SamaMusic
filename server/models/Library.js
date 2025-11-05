const mongoose = require("mongoose");
const { DEFAULT_IMAGES } = require("../constants");
const { userField } = require("./validObjectId");

const librarySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    createdBy: userField,
    image: { type: String, default: DEFAULT_IMAGES.LIBRARY },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("library", librarySchema);
