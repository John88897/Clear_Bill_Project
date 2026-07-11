const express = require("express");
const router = express.Router();

const { getCashier, RecievedBill, verifyPayment } = require("../controller/cashierController");
const { getAllBills, getBillById, updateBillStatus } = require("../controller/billController");
const { verifyCashier } = require('../middleware/authMiddleware');

router.get("/", verifyCashier, getAllBills); 
router.get("/:id", verifyCashier, getCashier);
router.get("/bill/:id", verifyCashier, getBillById);
router.put("/bill/:id/status", verifyCashier, updateBillStatus); 
router.post("/:id/recieve", verifyCashier, RecievedBill);

module.exports = router;