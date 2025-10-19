const Album = require("../../models/Album");
const { throwError, validateObjectId } = require("../../utils");

exports.getAlbumById = async (id) => {
  validateObjectId(id, "Album Id");
  const album = await Album.findById(id);
  if (!album || album.isDeleted) throwError(404, "Album not found");
  return album;
};
