const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    categoryId: categoryField,
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
