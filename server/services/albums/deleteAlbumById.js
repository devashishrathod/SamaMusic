const Album = require("../../models/Album");
const { throwError, validateObjectId } = require("../../utils");

exports.deleteAlbumById = async (id) => {
  validateObjectId(id, "Album Id");
  const album = await Album.findById(id);
  if (!album || album.isDeleted) throwError(404, "Album not found");
  album.isDeleted = true;
  album.isActive = false;
  album.updatedAt = new Date();
  await album.save();
  return;
};
