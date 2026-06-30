const express = require("express");
const router = express.Router();
const{ getDoctor, inputService } = require("../controller/doctorController");
router.get('/:id', getDoctor);
router.post("/:id/input", inputService)
module.exports = router;