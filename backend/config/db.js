const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    // process.env.DB_PORT,
    {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    },
);
// sequelize.sync({force:true})
// sequelize.sync({alter: true})
console.log("DB_NAME =", process.env.DB_NAME);
console.log("DB_USER =", process.env.DB_USER);
module.exports = sequelize;
