const mongoose = require("mongoose");
const Music = require("../../models/Music");
const { throwError } = require("../../utils");

exports.checkDuplicateMusic = async (id, title, artists, albumId) => {
  if (!title || !artists || !albumId) return;
  const duplicate = await Music.findOne({
    _id: { $ne: id },
    title,
    artists,
    albumId: new mongoose.Types.ObjectId(albumId),
    isDeleted: false,
  });
  if (duplicate) {
    throwError(400, "Music already exists with this title, artists & album");
  }
};
