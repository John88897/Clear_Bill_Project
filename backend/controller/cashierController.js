const { Payment, Bill, Patient, User } = require("../models");
exports.getCashier = async (req, res) => {

    try {

        const cashier = await User.findAll({
            where: {
                cashier_id: req.params.id,
            }
        })
        if(!cashier){
            return res.status(404).json({error: `cashier cannot be found!`})
        }
        res.json(cashier);
    } catch (error) {
        console.log("There is an error in cashierController" + error);
        res.status(500).json(error);
    }
};  