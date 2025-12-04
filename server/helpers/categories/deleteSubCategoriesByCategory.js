const SubCategory = require("../../models/SubCategory");
const { deleteMusicsBySubCategory } = require("../musics");
const { deleteImage } = require("../../services/uploads");

exports.deleteSubCategoriesByCategory = async (categoryId) => {
  const subCategories = await SubCategory.find({
    categoryId,
    isDeleted: false,
  });
  if (!subCategories.length) return;
  for (const sub of subCategories) {
    await deleteMusicsBySubCategory(sub?._id);
    await deleteImage(sub?.image);
    sub.image = null;
    sub.isDeleted = true;
    sub.isActive = false;
    sub.updatedAt = new Date();
    await sub.save();
  }
};
