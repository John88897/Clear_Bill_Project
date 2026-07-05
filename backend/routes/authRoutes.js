const express = require("express");
const router = express.Router();

const { login } = require("../controller/authController");
// const { verifyWebToken } = require('../middleware/authMiddleware');// const verifyLogin = require('../middleware/authMiddleware')
router.post("/login",  login);

module.exports = router;