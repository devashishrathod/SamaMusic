const cloudinary = require("../../configs/cloudinary");
const CLOUD_BASE = process.env.CLOUD_BASE_URL;

const isValidCloudinaryUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  return url.startsWith(CLOUD_BASE) && url.includes("/upload/");
};

const extractPublicId = (url) => {
  if (!url) return null;
  try {
    let clean = url.split("?")[0];
    let afterUpload = clean.split("/upload/")[1];
    if (!afterUpload) return null;
    let parts = afterUpload.split("/");
    while (
      parts.length &&
      (parts[0].includes(",") ||
        (parts[0].startsWith("v") && !isNaN(parts[0].substring(1))))
    ) {
      parts.shift();
    }
    const last = parts.pop();
    const filename = last.split(".")[0];
    return [...parts, filename].join("/");
  } catch (err) {
    console.error("Public ID extract error:", err);
    return null;
  }
};

exports.uploadFile = async (filePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    console.log("Cloudinary Uploaded:", {
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
    });
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
exports.deleteFile = async (url, resourceType = "image") => {
  if (!isValidCloudinaryUrl(url)) {
    console.log("Skip delete → Not a Cloudinary URL:", url);
    return false;
  }
  const publicId = extractPublicId(url);
  if (!publicId) {
    console.warn("Invalid Cloudinary URL:", url);
    return false;
  }
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    console.log("Cloudinary delete:", { publicId, result });
    return result.result === "ok" || result.result === "not found";
  } catch (err) {
    console.error("Cloudinary Delete Error:", err);
    return false;
  }
};
