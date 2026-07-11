const express = require("express");
const router = express.Router();
const { 
  getPatientBills, 
  getBillById, 
  getAllBills,       
  updateBillStatus   
} = require("../controller/billController");
const { verifyWebToken, verifyPatient } = require('../middleware/authMiddleware');

router.get("/", verifyWebToken, getAllBills); 
router.put("/:id/status", verifyWebToken, updateBillStatus);

router.get("/patient/:patientId", verifyPatient, getPatientBills);
router.get('/:id', verifyPatient, getBillById);

module.exports = router;