const express = require("express");
const router = express.Router();

const { isAdmin, verifyJwtToken } = require("../middlewares");
const {
  createAlbum,
  getAllAlbums,
  getAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albums");

router.post("/create", isAdmin, createAlbum);
router.get("/getAll", verifyJwtToken, getAllAlbums);
router.get("/get/:id", verifyJwtToken, getAlbum);
router.put("/update/:id", isAdmin, updateAlbum);
router.delete("/delete/:id", isAdmin, deleteAlbum);

module.exports = router;
