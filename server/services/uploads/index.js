const fs = require("fs");
const {
  uploadFile,
  deleteFile,
  getOptimizedImageUrl,
} = require("../../helpers/cloudinary");

exports.uploadImage = async (imagePath) => {
  const result = await uploadFile(imagePath, {
    resource_type: "image",
    folder: "Images",
  });
  return getOptimizedImageUrl(result.public_id);
};

exports.uploadAudio = async (audioPath) => {
  const result = await uploadFile(audioPath, {
    resource_type: "video",
    folder: "Audio",
  });
  return result.secure_url;
};

exports.uploadVideo = async (videoPath) => {
  const result = await uploadFile(videoPath, {
    resource_type: "video",
    folder: "Videos",
  });
  return result.secure_url;
};

exports.uploadPDF = async (pdfPath, fileName) => {
  const result = await uploadFile(pdfPath, {
    resource_type: "auto",
    folder: "Documents",
    public_id: fileName.replace(".pdf", ""),
  });
  if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
  console.log("PDF uploaded successfully:", result);
  return result.secure_url;
};

exports.deleteImage = async (url) => deleteFile(url, "image");
exports.deleteAudioOrVideo = async (url) => deleteFile(url, "video");
exports.deletePDF = async (url) => deleteFile(url, "raw");
