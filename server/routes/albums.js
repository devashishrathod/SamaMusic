const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middlewares");
const {
  createAlbum,
  getAllAlbums,
  getAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albums");

router.post("/create", isAdmin, createAlbum);
router.get("/getAll", getAllAlbums);
router.get("/get/:id", getAlbum);
router.put("/update/:id", isAdmin, updateAlbum);
router.delete("/delete/:id", isAdmin, deleteAlbum);

module.exports = router;
