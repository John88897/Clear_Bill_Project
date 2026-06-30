const express = require("express");
const router = express.Router();
const {
    getDashboard,
    getUsers,
    createUser,
    deleteUser,
    getServices,
    createService,
    deleteService
} = require("../controller/adminController");

router.get("/dashboard", getDashboard);
router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.get("/services", getServices);
router.post("/services", createService);
router.delete("/services/:id", deleteService);

module.exports = router;