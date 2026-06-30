const express = require("express");
const router = express.Router();
const{ getDoctor, getServices } = require("../controller/doctorController");
router.get('/:id', getDoctor);
router.get("/:id/services", getServices);
module.exports = router;