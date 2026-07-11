const express = require("express");
const router = express.Router();
const { getPatientBills, getBillById } = require("../controller/billController");
const { verifyToken } = require('../middleware/authMiddleware');
router.get("/patient/:patientId",verifyToken, getPatientBills);
router.get('/:id', verifyToken, getBillById);

module.exports = router;