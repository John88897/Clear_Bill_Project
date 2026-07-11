const { Payment, Bill, Patient, User, BillDetail, Service } = require("../models");
const { findService } = require("./doctorController");
const { findBillById } = require("./billController");

async function getSubtotal(quantity, serviceId) {
  const servicePrice = await Service.findOne({
    where: {
      service_id: serviceId
    }
  });
  if (!servicePrice) {
    throw new Error("Service not found");
  }
  const total = parseFloat(servicePrice.cost) * quantity
  return total;
}
function getTotal(quantity) {
  const tax = 0.50 * quantity;
  return tax;
}
exports.getCashier = async (req, res) => {

  try {

    const cashier = await User.findOne({
      where: {
        user_id: req.params.id,
        role: "Cashier"
      }
    })
    if (!cashier) {
      return res.status(404).json({ error: `cashier cannot be found!` })
    }
    res.json(cashier);
  } catch (error) {
    console.log("There is an error in cashierController" + error);
    res.status(500).json({ error: error.message });
  }
};
exports.RecievedBill = async (req, res) => {
  const { patientId, serviceId, quantity } = req.body;

  if (!patientId || !serviceId || !quantity) {
    return res.status(400).json({ error: "patientId, serviceId, and quantity are required!" });
  }
  try {
    const patient = await Patient.findOne({ where: { patient_id: patientId } });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    const subtotal = await getSubtotal(quantity, serviceId);
    const total = subtotal + getTotal(quantity);
    const now = new Date();

    const newBill = await Bill.create({
      patient_id: patientId,
      bill_date: now.toISOString().split("T")[0],
      total_amount: total,
    });

    const newBillDetail = await BillDetail.create({
      bill_id: newBill.bill_id,
      service_id: serviceId,
      quantity,
      subtotal,
    });

    res.status(201).json({ bill: newBill, detail: newBillDetail });
  } catch (error) {
    console.log("Error in RecievedBill: " + error);
    res.status(500).json({ error: error.message });
  }
}
exports.verifyPayment = async (req, res) => {
  const { billId } = req.body;
  if (!billId) {
    return res.status(400).json({ error: "billId is required" });
  }
  try {
    const bill = await findBillById(billId);

    if (bill.status === "paid") {
      return res.status(400).json({ error: "This bill is already marked as paid" });
    }

    bill.status = bill.status === "paid" ? "unpaid" : "paid";
    await bill.save();

    res.status(200).json(bill);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};