const { User, Patient, Bill, Payment, Service } = require("../models/index.js");

exports.getDashboard = async (req, res) => {
    try {
        const totalPatients = await Patient.count();
        const totalBills = await Bill.count();
        const totalUsers = await User.count();
        const totalRevenue = await Payment.sum("amount") || 0;

        const paidBills = await Bill.count({ where: { status: "Paid" } });
        const unpaidBills = await Bill.count({ where: { status: "Unpaid" } });

        res.json({
            totalPatients,
            totalBills,
            totalUsers,
            totalRevenue,
            paidBills,
            unpaidBills
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["user_id", "name", "email", "role"]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { user_id: req.params.id } });
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createService = async (req, res) => {
    try {
        const { service_name, description, cost } = req.body;
        const service = await Service.create({ service_name, description, cost });
        res.json(service);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteService = async (req, res) => {
    try {
        await Service.destroy({ where: { service_id: req.params.id } });
        res.json({ message: "Service deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createUser = async (req, res) => {
    try {
        console.log("BODY RECEIVED:", req.body);
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await User.findOne({ where: { email } });
        console.log("EXISTING USER:", existing);
        
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const newUser = await User.create({ name, email, password, role });
        console.log("NEW USER CREATED:", newUser);

        res.json(newUser);

    } catch (error) {
        console.log("CREATE USER ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};