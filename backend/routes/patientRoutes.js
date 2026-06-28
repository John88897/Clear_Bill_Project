const express = require("express");
const router = express.Router();

const { getDashboard, getProfile } = require("../controller/patientController");


router.get("/dashboard/:id", getDashboard);
router.get("/profile/:id", getProfile);
module.exports = router;