const { Payment, Bill, Patient, User } = require("../models");
const { findService } = require("./doctorController");
exports.getCashier = async (req, res) => {

    try {

        const cashier = await User.findAll({
            where: {
                user_id: req.params.id,
                role: "Cashier"
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
    const {bill_id, detail_id, service_id} = req.params.id
    const {patient_id, quantity, subtotal, bill_date, total_amount, status} = req.body;
    const getService = findService
    if(!getService){
        return res.status(404).json({error: `cannot find any service!`})
    }
    try {
        const newBill = await Bill.create({
            patient_id: patient_id,
            bill_date: bill_date,
            total_amount: total_amount,
            status:status
        })
        console.log("Added new Bill: " + newBill)
        res.json(newBill);
    } catch (error) {
        console.log(error + `there is an error in casheirController`)
        return res.status(404).json({error: error})
    }
}
