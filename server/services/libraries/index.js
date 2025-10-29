const { createLibrary } = require("./createLibrary");
const { getAllLibraries } = require("./getAllLibraries");
const { getLibraryById } = require("./getLibraryById");
const { updateLibraryById } = require("./updateLibraryById");
const { deleteLibraryById } = require("./deleteLibraryById");

module.exports = {
  createLibrary,
  getAllLibraries,
  getLibraryById,
  updateLibraryById,
  deleteLibraryById,
};
