const mongoose = require("mongoose");
const { DEFAULT_IMAGES } = require("../constants");
const {
  albumField,
  subCategoryField,
  categoryField,
} = require("./validObjectId");

const musicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    artists: {
      type: [String],
      required: true,
      trim: true,
      set: (arr) => [...new Set(arr.map((a) => a.trim()))],
    },
    albumId: albumField,
    subCategoryId: subCategoryField,
    categoryId: categoryField,
    releaseDate: { type: Date, default: Date.now },
    durationInSeconds: { type: Number },
    audio: { type: String, required: true },
    image: { type: String, default: DEFAULT_IMAGES.MUSIC },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Music", musicSchema);
