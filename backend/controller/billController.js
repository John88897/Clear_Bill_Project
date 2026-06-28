const { Bill, Patient, BillDetail, Service, User } = require("../models");

exports.getPatientBills = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        user_id: req.params.patientId,
      },
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const bills = await Bill.findAll({
      where: {
        patient_id: patient.patient_id,
      },
      order: [["bill_date", "DESC"]],
    });

    res.json(bills);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findOne({
      where: { bill_id: req.params.id },
      include: [
        {
          model: Patient,
          include: [{ model: User, attributes: ["name"] }],
        },
        {
          model: BillDetail,
          include: [{ model: Service, attributes: ["service_name", "cost", "description"] }],
        },
      ],
    });

    if (!bill) return res.status(404).json({ message: "Bill not found" });

    res.json(bill);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
