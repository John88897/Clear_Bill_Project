const express = require("express");
const router = express.Router();
const {verifyAdmin} = require('../middleware/authMiddleware')
const {
    getDashboard,
    getUsers,
    createUser,
    deleteUser,
    getServices,
    createService,
    deleteService,
    getRevenueReport
} = require("../controller/adminController");


router.get("/dashboard", verifyAdmin, getDashboard);
router.get("/users",  verifyAdmin, getUsers);
router.post("/users", verifyAdmin , createUser);
router.delete("/users/:id",verifyAdmin ,  deleteUser);
router.get("/services", verifyAdmin , getServices);
router.post("/services", verifyAdmin , createService);
router.delete("/services/:id",verifyAdmin ,  deleteService);
router.get("/reports", verifyAdmin , getRevenueReport);

module.exports = router;