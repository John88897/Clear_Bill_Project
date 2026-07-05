const express = require("express");
const router = express.Router();
const{ getDoctor, findService } = require("../controller/doctorController");
router.get('/', getDoctor);
router.post("/:id/input", findService)
module.exports = router;