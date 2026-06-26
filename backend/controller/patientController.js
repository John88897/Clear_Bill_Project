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
                patient_id: req.params.id
            }
        });

        const paidBills = await Bill.count({
            where: {
                patient_id: req.params.id,
                status: "Paid"
            }
        });

        const unpaidBills = await Bill.count({
            where: {
                patient_id: req.params.id,
                status: "Unpaid"
            }
        });
        const unpaidAmount = await Bill.sum("total_amount", {
    where: {
        patient_id: req.params.id,
        status: "Unpaid"
    }
});

        res.json({
            patient_id: patient.patient_id,
            name: patient.User.name,
            gender: patient.gender,
            address: patient.address,
            totalBills,
            paidBills,
            unpaidBills,
            unpaidAmount
        });

    } catch (error) {
        res.status(500).json(error);
    }
};