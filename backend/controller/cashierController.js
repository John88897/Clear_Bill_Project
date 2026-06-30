const { Payment, Bill, Patient, User } = require("../models");
exports.getCashier = async (req, res) => {

    try {

        const cashier = await User.findOne({
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
exports.generateBill = async (req , res) => {
    const {bill_id, amount, payment_method, payment_date} = req.body;

}
exports.processPayment = async (req , res) => {
  
}
