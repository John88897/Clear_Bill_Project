const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/db");

const Bill = sequelize.define("Bill", {
    bill_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bill_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM("Paid", "Unpaid"),
        defaultValue: "Unpaid"
    }
}, {
    tableName: "bills",
    timestamps: false
});

module.exports = Bill;