const { calculateAudioDuration } = require("./calculateAudioDuration");
const { checkDuplicateMusic } = require("./checkDuplicateMusic");
const { deleteMusicsByAlbum } = require("./deleteMusicsByAlbum");
const { deleteMusicsBySubCategory } = require("./deleteMusicsBySubCategory");

module.exports = {
  calculateAudioDuration,
  checkDuplicateMusic,
  deleteMusicsByAlbum,
  deleteMusicsBySubCategory,
};
