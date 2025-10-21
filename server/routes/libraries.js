const express = require("express");
const router = express.Router();

const { verifyJwtToken } = require("../middlewares");
const {
  createLibrary,
  getAllLibraries,
  getLibrary,
  updateLibrary,
  deleteLibrary,
} = require("../controllers/libraries");

router.use(verifyJwtToken);

router.post("/create", createLibrary);
router.get("/getAll", getAllLibraries);
router.get("/get/:id", getLibrary);
router.put("/update/:id", updateLibrary);
router.delete("/delete/:id", deleteLibrary);

module.exports = router;
