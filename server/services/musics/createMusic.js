const mongoose = require("mongoose");
const Music = require("../../models/Music");
const Album = require("../../models/Album");
const SubCategory = require("../../models/SubCategory");
const { throwError } = require("../../utils");
const { calculateAudioDuration } = require("../../helpers/musics");
const { uploadImage, uploadAudio } = require("../../services/uploads");

exports.createMusic = async (payload, image, audio) => {
  let {
    title,
    description,
    artists,
    albumId,
    subCategoryId,
    durationInSeconds,
    releaseDate,
    isActive,
  } = payload;
  const album = await Album.findById(albumId);
  if (!album || album.isDeleted) {
    throwError(404, "Album not found");
  }
  const subCategory = await SubCategory.findById(subCategoryId);
  if (!subCategory || subCategory.isDeleted) {
    throwError(404, "Sub-category not found");
  }
  const categoryId = subCategory.categoryId;
  title = title?.trim()?.toLowerCase();
  description = description?.trim()?.toLowerCase();
  artists = artists?.map((artist) => artist.trim().toLowerCase());
  const existingMusic = await Music.findOne({
    title,
    artists,
    albumId: new mongoose.Types.ObjectId(albumId),
    isDeleted: false,
  });
  if (existingMusic) {
    throwError(400, "Music already exists with this title and artist");
  }
  let imageUrl, audioUrl;
  if (image) imageUrl = await uploadImage(image.tempFilePath);
  if (audio) audioUrl = await uploadAudio(audio.tempFilePath);
  if (!durationInSeconds && audio) {
    durationInSeconds = await calculateAudioDuration(audio.tempFilePath);
  }
  return await Music.create({
    title,
    description,
    artists,
    albumId,
    subCategoryId,
    categoryId,
    releaseDate,
    durationInSeconds,
    image: imageUrl,
    audio: audioUrl,
    isActive,
  });
};
