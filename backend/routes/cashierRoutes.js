const express = require("express");
const router = express.Router();

const { getCashier, generateBill, processPayment } = require("../controller/cashierController");

router.get("/:cashier_id", getCashier);
router.get("/:cashier_id/genearateBill", generateBill);
router.get("/:cashier_id/bill_id/", processPayment)

module.exports = router;