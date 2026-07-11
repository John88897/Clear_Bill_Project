const express = require("express");
const router = express.Router();
const {getService, getAllService} = require("../controller/serviceController")
const {verifyWebToken} = require("../middleware/authMiddleware")
router.get("/", verifyWebToken, getAllService);
router.get("/:id", verifyWebToken, getService);

module.exports = router;

