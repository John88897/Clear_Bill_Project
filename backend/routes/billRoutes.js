const express = require("express");
const router = express.Router();
const { getPatientBills, getBillById } = require("../controller/billController");
const { verifyWebToken } = require('../middleware/authMiddleware');
router.get("/patient/:patientId",verifyWebToken, getPatientBills);
router.get('/:id', verifyWebToken, getBillById);
module.exports = router;