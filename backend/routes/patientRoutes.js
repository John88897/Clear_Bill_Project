const express = require("express");
const router = express.Router();

const { getDashboard, getProfile } = require("../controller/patientController");
const { verifyToken } = require('../middleware/authMiddleware');
router.get("/dashboard/:id",verifyToken, getDashboard);
router.get("/profile/:id",verifyToken, getProfile);
module.exports = router;