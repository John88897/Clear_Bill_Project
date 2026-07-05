const express = require("express");
const router = express.Router();

const { getDashboard, getProfile } = require("../controller/patientController");
const { verifyWebToken } = require('../middleware/authMiddleware');
router.get("/dashboard/:id",verifyWebToken, getDashboard);
router.get("/profile/:id",verifyWebToken, getProfile);
module.exports = router;