const Library = require("../../models/Library");
const { throwError, validateObjectId } = require("../../utils");

exports.getLibraryById = async (id) => {
  validateObjectId(id, "Library Id");
  const library = await Library.findById(id);
  if (!library || library.isDeleted) throwError(404, "Library not found");
  return library;
};
