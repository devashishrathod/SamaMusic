const cloudinary = require("../../configs/cloudinary");

const extractPublicId = (cloudinaryUrl) => {
  if (!cloudinaryUrl || typeof cloudinaryUrl !== "string") return null;
  try {
    const cleanUrl = cloudinaryUrl.split("?")[0];
    const parts = cleanUrl.split("/");
    const uploadIndex = parts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return null;
    const pathParts = parts.slice(uploadIndex + 1);
    const fileName = pathParts.pop();
    const publicId = `${pathParts.join("/")}/${fileName.split(".")[0]}`;
    return publicId;
  } catch (err) {
    console.error("Error extracting Cloudinary public_id:", err.message);
    return null;
  }
};

exports.uploadFile = async (filePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Cloudinary upload failed");
  }
};

exports.getOptimizedImageUrl = (publicId) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
};

/**
 * Generic file deleter for Cloudinary
 * @param {string} cloudinaryUrl - Full Cloudinary URL
 * @param {"image"|"video"|"raw"} [resourceType="image"] - Type of resource
 */
exports.deleteFile = async (cloudinaryUrl, resourceType = "image") => {
  const publicId = extractPublicId(cloudinaryUrl);
  if (!publicId) {
    console.warn("Invalid Cloudinary URL:", cloudinaryUrl);
    return false;
  }
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    if (result.result === "ok" || result.result === "not found") return true;
    console.warn("Cloudinary deletion response:", result);
    return false;
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error.message);
    return false;
  }
};
