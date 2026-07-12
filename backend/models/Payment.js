const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/db");

const Payment = sequelize.define("Payment", {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bill_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_method: {
        type: DataTypes.ENUM(
            "Cash",
            "Card",
            "Bank Transfer"
        )
    },
    payment_date: {
            type: DataTypes.DATEONLY
        }
}, {
    tableName: "payments",
    timestamps: false
});

module.exports = Payment;