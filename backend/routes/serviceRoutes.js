const express = require("express");
const router = express.Router();
const {getService, getAllService} = require("../controller/serviceController")
router.get("/", getAllService);
router.get("/:id", getService);

module.exports = router;

