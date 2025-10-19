const Album = require("../../models/Album");
const { throwError } = require("../../utils");
const { uploadImage } = require("../uploads");

exports.createAlbum = async (payload, image) => {
  let { name, description, isActive } = payload;
  name = name?.toLowerCase();
  description = description?.toLowerCase();
  const existingAlbum = await Album.findOne({ name, isDeleted: false });
  if (existingAlbum) throwError(400, "Album already exist with this name");
  let imageUrl;
  if (image) imageUrl = await uploadImage(image.tempFilePath);
  const newAlbum = await Album.create({
    name,
    description,
    image: imageUrl,
    isActive,
  });
  return newAlbum;
};
