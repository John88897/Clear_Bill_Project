const { Bill, Patient, BillDetail, Service, User } = require("../models");
async function findBillById(billId) {
  const bill = await Bill.findOne({
    where: { bill_id: billId },
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

  if (!bill) {
    throw new Error("Bill not found");
  }
  return bill;
}

exports.getPatientBills = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: { user_id: req.params.patientId },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const bills = await Bill.findAll({
      where: { patient_id: patient.patient_id },
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
    const bill = await findBillById(req.params.id);
    res.json(bill);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.findAll({
      include: [
        {
          model: Patient,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
      ],
      order: [["bill_date", "DESC"]],
    });

    res.json(bills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch bills for cashier" });
  }
};

exports.updateBillStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate incoming status
    if (!["Paid", "Unpaid"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the specific bill
    const bill = await Bill.findOne({ where: { bill_id: id } });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // Update and save
    bill.status = status;
    await bill.save();

    res.json({ 
      message: `Bill #${id} successfully marked as ${status}`, 
      bill 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update bill status" });
  }
};

exports.findBillById = findBillById;
exports.findBillById = findBillById;