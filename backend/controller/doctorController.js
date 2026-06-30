const { Payment, Bill, Patient, User, Service } = require("../models");
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await User.findOne({
      where: {
        user_id: req.params.id,
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
exports.inputService = async (req, res) => {
  const { service_name, description, cost } = req.body;
  if ( !service_name || !description || !cost) {
    return res.status(400).json("All field must be provided!");
  }
  try {
    const newService = await Service.create({
      service_name: service_name,
      description: description,
      cost: cost,
    });

    console.log(newService);
    res.status(201).json(newService);
  } catch (error) {
    console.log({ error: error + `There is an error inside doctorController` });
    return res.status(500).json({ error: error.message });
  }
};
