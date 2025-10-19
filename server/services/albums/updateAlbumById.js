const Album = require("../../models/Album");
const { throwError, validateObjectId } = require("../../utils");
const { uploadImage, deleteImage } = require("../uploads");

exports.updateAlbumById = async (id, payload = 0, image) => {
  validateObjectId(id, "Album Id");
  const album = await Album.findById(id);
  if (!album || album.isDeleted) throwError(404, "Album not found");
  if (payload) {
    let { name, description, isActive } = payload;
    if (typeof isActive !== "undefined") album.isActive = !album.isActive;
    if (name) {
      name = name.toLowerCase();
      const existing = await Album.findOne({
        _id: { $ne: id },
        name,
        isDeleted: false,
      });
      if (existing) throwError(400, "Another Album exists with this name");
      album.name = name;
    }
    if (description) album.description = description?.toLowerCase() || "";
  }
  if (image) {
    if (Album.image) await deleteImage(album.image);
    const imageUrl = await uploadImage(image.tempFilePath);
    album.image = imageUrl;
  }
  album.updatedAt = new Date();
  await album.save();
  return album;
};
