const express = require("express");
const router = express.Router();
const { getPatientBills, getBillById } = require("../controller/billController");

router.get("/patient/:patientId", getPatientBills);
router.get('/:id', getBillById);
module.exports = router;