const Music = require("../../models/Music");
const { throwError, validateObjectId } = require("../../utils");
const { deleteAudioOrVideo, deleteImage } = require("../uploads");

exports.deleteMusic = async (id) => {
  validateObjectId(id, "Music Id");
  const music = await Music.findById(id);
  if (!music || music.isDeleted) throwError(404, "Music not found");
  await deleteAudioOrVideo(music?.audio);
  await deleteImage(music?.image);
  await Music.findByIdAndUpdate(id, {
    audio: null,
    image: null,
    isDeleted: true,
    isActive: false,
  });
  return;
};
