const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middlewares");
const {
  create,
  getAll,
  get,
  deleteMusic,
  update,
} = require("../controllers/musics");

router.post("/add", isAdmin, create);
router.get("/getAll", getAll);
router.get("/:id/get", get);
router.delete("/:id/delete", isAdmin, deleteMusic);
router.put("/:id/update", isAdmin, update);

module.exports = router;
