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
            attributes: ["user_id", "name", "email", "role"],
            include: [{
                model: Patient,
                attributes: ["patient_id"],
                required: false  // LEFT JOIN so non-patients still show
            }]
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

exports.getRevenueReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const { Op, literal } = require("sequelize");

        // Add end of day time to endDate to include all payments on that day
        const endDateFull = `${endDate} 23:59:59`;
        const startDateFull = `${startDate} 00:00:00`;

        const payments = await Payment.findAll({
            where: {
                payment_date: {
                    [Op.between]: [startDateFull, endDateFull]
                }
            },
            include: [{
                model: Bill,
                include: [{
                    model: Patient,
                    include: [{ model: User, attributes: ["name"] }]
                }],
            }],
            order: [["payment_date", "ASC"]]
        });

        console.log("Payments found:", payments.length);
        console.log("Date range:", startDateFull, "to", endDateFull);

        const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
        const totalPayments = payments.length;

        const revenueByDate = {};
        payments.forEach(p => {
            const date = new Date(p.payment_date).toISOString().split("T")[0];
            revenueByDate[date] = (revenueByDate[date] || 0) + Number(p.amount);
        });

        const chartData = Object.entries(revenueByDate).map(([date, amount]) => ({
            date,
            amount
        }));

        res.json({ totalRevenue, totalPayments, chartData, payments });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};