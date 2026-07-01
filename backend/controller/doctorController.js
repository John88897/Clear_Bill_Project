const { where } = require("sequelize");
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
  const { patientId, service_name, description, cost } = req.body;
  if (!patientId || !service_name || !description || !cost) {
    return res.status(400).json("All field must be provided!");
  }
  try {
    const findPatient = await Patient.findOne({
      where: { patient_id: patientId },
    });
    if (!findPatient) {
      return res
        .status(404)
        .json({ error: `cannot find the patient with this id!` });
    }
    const doctor = await User.findOne({
      where: {
        user_id: doctorId,
        role: "Doctor",
      },
    });
    if (!doctor) {
      return res
        .status(403)
        .json({ error: "Sorry! only Doctor can accessed!!" });
    }
    const foundService = await Service.findOne({
      where: { patient_id: patientId },
      doctor_id: doctorId,
    });

    console.log(findService);
    res.status(201).json(findService);
  } catch (error) {
    console.log({ error: error + `There is an error inside doctorController` });
    return res.status(500).json({ error: error.message });
  }
};
