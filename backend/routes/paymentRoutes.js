const express = require("express");
const router = express.Router();
const { verifyWebToken } = require('../middleware/authMiddleware');const { getPayments } = require("../controller/paymentController");

router.get("/patient/:patientId", verifyWebToken ,getPayments);

module.exports = router;