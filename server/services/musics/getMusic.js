const Music = require("../../models/Music");
const { throwError, validateObjectId } = require("../../utils");

exports.getMusic = async (id) => {
  validateObjectId(id, "Music Id");
  const music = await Music.findById(id);
  if (!music || music.isDeleted) throwError(404, "Music not found");
  return music;
};
