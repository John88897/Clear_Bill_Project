const { Payment, Bill, Patient, User } = require("../models");
exports.getDoctor = async (req, res) => {

    try {

        const doctor = await User.findOne({
            where: {
                user_id: req.params.id,
            }
        })
        if(!doctor){
            return res.status(404).json({error: `doctor cannot be found!`})
        }
        res.json(doctor);
    } catch (error) {
        console.log("There is an error in doctorController" + error);
        res.status(500).json(error);
    }
};  
exports.getServices= async (req , res) => {
    const {service_id, service_name, description, cost} = req.body;
}
