const { createLibrary } = require("./createLibrary");
const { getAllLibraries } = require("./getAllLibraries");
const { getLibrary } = require("./getLibrary");
const { updateLibrary } = require("./updateLibrary");
const { deleteLibrary } = require("./deleteLibrary");

module.exports = {
  createLibrary,
  getAllLibraries,
  getLibrary,
  updateLibrary,
  deleteLibrary,
};
