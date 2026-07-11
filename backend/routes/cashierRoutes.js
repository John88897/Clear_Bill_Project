const express = require("express");
const router = express.Router();

const { getCashier, RecievedBill } = require("../controller/cashierController");
const { verifyCashier } = require ("../middleware/authMiddleware");
router.get("/:id",verifyCashier, getCashier);
router.post("/:id/recieve", verifyCashier, RecievedBill );

module.exports = router;