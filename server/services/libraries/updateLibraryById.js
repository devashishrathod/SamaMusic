const Library = require("../../models/Library");
const { throwError, validateObjectId } = require("../../utils");
const { uploadImage, deleteImage } = require("../uploads");

exports.updateLibraryById = async (userId, id, payload = 0, image) => {
  validateObjectId(id, "Library Id");
  const library = await Library.findById(id);
  if (!library || library.isDeleted) throwError(404, "Library not found");
  if (library?.createdBy?.toString() !== userId?.toString()) {
    throwError(403, "You can't update this library");
  }
  if (payload) {
    let { name, description, isActive } = payload;
    if (typeof isActive !== "undefined") library.isActive = !library.isActive;
    if (name) {
      name = name.toLowerCase();
      const existing = await Library.findOne({
        _id: { $ne: id },
        name,
        createdBy: userId,
        isDeleted: false,
      });
      if (existing) {
        throwError(400, "You have another library exists with this name");
      }
      library.name = name;
    }
    if (description) library.description = description?.toLowerCase() || "";
  }
  if (image) {
    if (library.image) await deleteImage(library.image);
    const imageUrl = await uploadImage(image.tempFilePath);
    library.image = imageUrl;
  }
  library.updatedAt = new Date();
  await library.save();
  return library;
};
