const { createAlbum } = require("./createAlbum");
const { getAllAlbums } = require("./getAllAlbums");
const { getAlbumById } = require("./getAlbumById");
const { updateAlbumById } = require("./updateAlbumById");
const { deleteAlbumById } = require("./deleteAlbumById");

module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbumById,
  deleteAlbumById,
};
