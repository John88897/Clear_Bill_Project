const { Service } = require("../models");
exports.getService = async (req, res) => {

    try {

        const service = await Service.findOne({
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
exports.getAllService = async (req, res) => {
    try {
        const service =  await Service.findAll();
        res.status(200).json(service);
    } catch (error) {
        console.log( error+ ` there is an error in serviceController`)
        return res.status(404).json({error: `there is an error in serviceController`})
    }
}