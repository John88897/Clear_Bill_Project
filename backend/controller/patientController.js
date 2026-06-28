const { Patient, User, Bill } = require("../models");

exports.getDashboard = async (req, res) => {
    try {

        const patient = await Patient.findOne({
            where: {
                user_id: req.params.id
            },
            include: [User]
        });

        const totalBills = await Bill.count({
            where: {
                patient_id: patient.patient_id
            }
        });

        const paidBills = await Bill.count({
            where: {
                patient_id: patient.patient_id,
                status: "Paid"
            }
        });

        const unpaidBills = await Bill.count({
            where: {
                patient_id: patient.patient_id,
                status: "Unpaid"
            }
        });
        const unpaidAmount = await Bill.sum("total_amount", {
    where: {
        patient_id: patient.patient_id,
        status: "Unpaid"
    }
    
});
const bills = await Bill.findAll({
    where: {
        patient_id: patient.patient_id
    },
    order: [["bill_date", "DESC"]]
});
console.log("User ID:", req.params.id);
console.log("Patient:", patient);
console.log("Patient ID:", patient.patient_id);
console.log("Total Bills:", totalBills);
console.log("Paid Bills:", paidBills);
console.log("Unpaid Bills:", unpaidBills);
console.log("Unpaid Amount:", unpaidAmount);
        res.json({
            patient_id: patient.patient_id,
            name: patient.User.name,
            gender: patient.gender,
            address: patient.address,
            totalBills,
            paidBills,
            unpaidBills,
            unpaidAmount,
            bills
        });
        

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getProfile = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: { user_id: req.params.id },
            include: [{ model: User, attributes: ["name", "email"] }]
        });

        if (!patient) return res.status(404).json({ message: "Patient not found" });

        res.json({
            name: patient.User.name,
            email: patient.User.email,
            gender: patient.gender,
            phone: patient.phone,
            address: patient.address,
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getPayments = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: { user_id: req.params.patientId }
        });

        console.log("Patient ID received:", req.params.patientId);
        console.log("Patient found:", patient);

        if (!patient) return res.status(404).json({ message: "Patient not found" });

        const payments = await Payment.findAll({
            include: [{
                model: Bill,
                where: { patient_id: patient.patient_id }
            }],
            order: [["payment_date", "DESC"]]
        });

        console.log("Payments found:", payments.length);

        res.json(payments);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json(error);
    }
};