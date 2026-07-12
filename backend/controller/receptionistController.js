const { Payment, Bill, Patient, User } = require("../models");
const { pool } = require('../config/db.js');
exports.getReceptionist = async (req, res) => {

    try {

        const receptionist = await User.findOne({
            where: {
                user_id: req.params.id
            }
        })
        if (!receptionist) {
            return res.status(404).json({ error: `receptionist cannot be found!` })
        }
        res.json(receptionist);
    } catch (error) {
        console.log("There is an error in receptionistController" + error);
        res.status(500).json(error);
    }
};
exports.createPatient = async (req, res) => {

    try {
        const { name, email, password, phone, gender, address, role } = req.body;
        if (!gender || !address || !name || !email || !password) {
            return res.status(400).json("All field must be provided!");
        }
        const newUserPatient = await User.create({
            name: name,
            email: email,
            password: password,
            role: 'Patient' //defining the default role to be Patient as soon as it is being created
        });
        console.log("new user id:", newUserPatient.user_id);
        const newPatient = await Patient.create(
            {
                user_id: newUserPatient.user_id,
                gender: gender,
                // phone: phone,
                address: address,
            });
        await pool.query(`create '${name}'@'localhost' identified by '${password}'`);
        await pool.query(`grant 'Patient' to '${name}'@'localhost'`);
        res.status(201).json({ message: `successfully created new Patient`, data: newPatient })
    } catch (error) {
        console.log(`There is an error inside receptionistController: ${error}`)
        return res.status(500).json({ error: error.message }
        )
    }
}