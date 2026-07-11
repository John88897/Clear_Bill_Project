const express = require("express");
const router = express.Router();

const { getDashboard, getProfile } = require("../controller/patientController");
const { verifyPatient } = require('../middleware/authMiddleware');
router.get("/dashboard/:id",verifyPatient, getDashboard);
router.get("/profile/:id",verifyPatient, getProfile);

module.exports = router;