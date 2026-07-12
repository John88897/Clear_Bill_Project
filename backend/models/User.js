const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/db");

const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM(
        "Admin",
        "Cashier",
        "Receptionist",
        "Patient",
        "Doctor"
    )
},{
    tableName: "users",
    timestamps: false
});

module.exports = User;