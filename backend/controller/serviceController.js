const { Service } = require("../models");
exports.getDoctor = async (req, res) => {

    try {

        const service = await Service.findAll({
            where: {
                service_id: req.params.id,
            }
        })
        if(!service){
            return res.status(404).json({error: `service cannot be found!`})
        }
        res.json(service);
    } catch (error) {
        console.log("There is an error in serviceController" + error);
        res.status(500).json(error);
    }
};  
