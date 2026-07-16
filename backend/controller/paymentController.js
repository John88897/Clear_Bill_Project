const { Payment, Bill, Patient } = require("../models");

exports.getPayments = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: { user_id: req.params.patientId }
        });

        console.log("Patient ID received:", req.params.patientId);
        console.log("Patient found:", patient?.patient_id);

        if (!patient) return res.status(404).json({ message: "Patient not found" });

        const payments = await Payment.findAll({
            include: [{
                model: Bill,
                where: { patient_id: patient_id }
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