const express = require("express");
const router = express.Router();
const{ getDoctor, findService } = require("../controller/doctorController");
const {verifyDoctor} = require("../middleware/authMiddleware")

router.post("/:id/input",verifyDoctor, findService)

router.get('/:id',verifyDoctor, getDoctor);
module.exports = router;