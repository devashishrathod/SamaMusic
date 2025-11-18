const Library = require("../../models/Library");
const { throwError, validateObjectId } = require("../../utils");
const { deleteImage } = require("../uploads");

exports.deleteLibraryById = async (userId, id) => {
  validateObjectId(id, "Library Id");
  const library = await Library.findById(id);
  if (!library || library.isDeleted) throwError(404, "Library not found");
  if (library?.createdBy?.toString() !== userId?.toString()) {
    throwError(403, "You can't delete this library");
  }
  await deleteImage(library?.image);
  library.isDeleted = true;
  library.isActive = false;
  library.updatedAt = new Date();
  await library.save();
  return;
};
