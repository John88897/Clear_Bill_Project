const {DataTypes, STRING} =require("sequelize");
const sequelize = require("../config/db");

const Patient = sequelize.define("Patient", {
    patient_id: {
        type: DataTypes.INTEGER  ,
        primaryKey: true,
        autoIncrement: true,
    },    
        user_id:{
            type: DataTypes.INTEGER,
            unique: true
        },
        gender: DataTypes.STRING,
        // phone: DataTypes,STRING,
        address: DataTypes.TEXT
},  {
        tableName: "patients",
        timestamps: false
    });

module.exports = Patient;