const express = require("express");
const router = express.Router();
const{ getDoctor, findService } = require("../controller/doctorController");
router.get('/:id', getDoctor);
router.post("/:id/input", findService)
module.exports = router;