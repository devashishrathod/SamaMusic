const express = require("express");
const router = express.Router();

const {
  create,
  getAll,
  get,
  update,
  deleteDhun,
} = require("../controllers/dhun");

router.post("/add", create);
router.get("/get/:dhunId", get);
router.get("/getAll", getAll);
router.put("/update/:dhunId", update);
router.delete("/delete/:dhunId", deleteDhun);

module.exports = router;
