const express = require("express");
const router = express.Router();

const { getCashier, generateBill } = require("../controller/cashierController");

router.get("/:id", getCashier);
router.get("/:id/genearateBill", generateBill);
// router.get("/:id/bill_id/", processPayment);


module.exports = router;