const express = require("express");
const router = express.Router();

const { getReceptionist,createPatient } = require("../controller/receptionistController");
const {verifyReceptionist} = require("../middleware/authMiddleware")
router.get("/:id",verifyReceptionist, getReceptionist);
router.post("/:id/create", verifyReceptionist, createPatient)

module.exports = router;