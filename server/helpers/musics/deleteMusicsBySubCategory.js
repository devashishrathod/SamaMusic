const Music = require("../../models/Music");
const { deleteAudioOrVideo, deleteImage } = require("../../services/uploads");

exports.deleteMusicsBySubCategory = async (subCategoryId) => {
  const musics = await Music.find({ subCategoryId, isDeleted: false });
  if (!musics.length) return;
  for (const music of musics) {
    await deleteAudioOrVideo(music?.audio);
    await deleteImage(music?.image);
    await Music.findByIdAndUpdate(
      { _id: music?._id },
      {
        audio: null,
        image: null,
        isDeleted: true,
        isActive: false,
        updatedAt: new Date(),
      }
    );
  }
};
