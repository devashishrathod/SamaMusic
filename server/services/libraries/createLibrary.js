const Library = require("../../models/Library");
const { throwError } = require("../../utils");
const { uploadImage } = require("../uploads");

exports.createLibrary = async (userId, payload, image) => {
  let { name, description, isActive } = payload;
  name = name?.toLowerCase();
  description = description?.toLowerCase();
  const existingLibrary = await Library.findOne({
    name,
    createdBy: userId,
    isDeleted: false,
  });
  if (existingLibrary) {
    throwError(400, "You have already a library with this name");
  }
  let imageUrl;
  if (image) imageUrl = await uploadImage(image.tempFilePath);
  return await Library.create({
    name,
    description,
    createdBy: userId,
    image: imageUrl,
    isActive,
  });
};
