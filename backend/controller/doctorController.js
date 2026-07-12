const { Patient, User, Service } = require("../models");

exports.getDoctor = async (req, res) => {
  try {
    const doctor = await User.findOne({
      where: {
        user_id: req.params.id,
        role: "Doctor",
      },
    });
    if (!doctor) {
      return res.status(404).json({ error: `doctor cannot be found!` });
    }
    res.json(doctor);
  } catch (error) {
    console.log("There is an error in doctorController" + error);
    res.status(500).json(error);
  }
};
exports.findService = async (req, res) => {
  const doctorId = req.params.id;
    const { patientId, serviceId, quantity } = req.body;

  if (!patientId || !serviceId || !quantity) {
    return res.status(400).json({ error: "Patient ID, Service ID, and Quantity are all required!" });
  }

  try {
    const findPatient = await Patient.findOne({
      where: { patient_id: patientId },
    });
    if (!findPatient) {
      return res.status(404).json({ error: `Cannot find the patient with this ID!` });
    }
    const findService = await Service.findOne({
      where: { service_id: serviceId } 
    });
    if (!findService) {
      return res.status(404).json({ error: `Service ID ${serviceId} does not exist in the database.` });
    }
    const doctor = await User.findOne({
      where: {
        user_id: doctorId,
        role: "Doctor",
      },
    });
    if (!doctor) {
      return res.status(403).json({ error: "Access Denied: Only users with the Doctor role can access this entry point." });
    }
    return res.status(200).json({
      message: "Data validated and processed successfully!",
      patientId,
      serviceId,
      quantity
    });

  } catch (error) {
    console.log("Error inside findService controller: " + error);
    return res.status(500).json({ error: error.message });
  }
};