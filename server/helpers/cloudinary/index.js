const cloudinary = require("../../configs/cloudinary");

const uploadFile = async (filePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Cloudinary upload failed");
  }
};

const deleteFile = async (cloudinaryUrl) => {
  const publicId = cloudinaryUrl.split("/").pop().split(".")[0];
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
    throw new Error("Cloudinary deletion failed");
  }
};

const getOptimizedImageUrl = (publicId) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
};

module.exports = { uploadFile, deleteFile, getOptimizedImageUrl };
