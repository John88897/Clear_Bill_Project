const express = require("express");
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');const { getPayments } = require("../controller/paymentController");

router.get("/patient/:patientId", verifyToken ,getPayments);

module.exports = router;