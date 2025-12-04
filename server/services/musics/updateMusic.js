const Music = require("../../models/Music");
const Album = require("../../models/Album");
const SubCategory = require("../../models/SubCategory");
const { validateObjectId, throwError } = require("../../utils");
const {
  checkDuplicateMusic,
  calculateAudioDuration,
} = require("../../helpers/musics");
const {
  uploadImage,
  uploadAudio,
  deleteImage,
  deleteAudioOrVideo,
} = require("../../services/uploads");

exports.updateMusic = async (id, payload, image, audio) => {
  validateObjectId(id, "Music ID");
  const result = await Music.findById(id);
  if (!result || result.isDeleted) {
    throwError(404, "Music not found");
  }
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
  if (payload) {
    const newTitle = title ? title.trim().toLowerCase() : result.title;
    const newArtists = artists
      ? artists.map((a) => a.trim().toLowerCase())
      : result.artists;
    const newAlbumId = albumId ? albumId : result.albumId;

    let checkDuplicate = false;
    if (title && newTitle !== result.title) checkDuplicate = true;
    if (
      artists &&
      JSON.stringify(newArtists) !== JSON.stringify(result.artists)
    ) {
      checkDuplicate = true;
    }
    if (albumId && newAlbumId.toString() !== result.albumId.toString()) {
      checkDuplicate = true;
    }
    if (checkDuplicate) {
      await checkDuplicateMusic(id, newTitle, newArtists, newAlbumId);
    }
    if (albumId) {
      validateObjectId(albumId, "Album ID");
      const album = await Album.findById(albumId);
      if (!album || album.isDeleted) {
        throwError(404, "Album not found");
      }
      result.albumId = albumId;
    }
    if (subCategoryId) {
      validateObjectId(subCategoryId, "Sub-category ID");
      const subCategory = await SubCategory.findById(subCategoryId);
      if (!subCategory || subCategory.isDeleted) {
        throwError(404, "Sub-category not found");
      }
      const categoryId = subCategory.categoryId;
      result.subCategoryId = subCategoryId;
      result.categoryId = categoryId;
    }
    if (title) {
      title = title?.trim()?.toLowerCase();
      result.title = title;
    }
    if (description) {
      description = description?.trim()?.toLowerCase();
      result.description = description;
    }
    if (artists) {
      artists = artists?.map((artist) => artist.trim().toLowerCase());
      result.artists = artists;
    }
  }
  if (image) {
    await deleteImage(result?.image);
    result.image = await uploadImage(image.tempFilePath);
  }
  if (audio) {
    await deleteAudioOrVideo(result?.audio);
    result.audio = await uploadAudio(audio.tempFilePath);
    if (!durationInSeconds && audio) {
      result.durationInSeconds = await calculateAudioDuration(
        audio.tempFilePath
      );
    }
  }
  if (releaseDate) result.releaseDate = releaseDate;
  if (isActive !== undefined) result.isActive = isActive;
  return await result.save();
};
