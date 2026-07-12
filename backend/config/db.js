const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');
const mysql2 = require("mysql2");
dotenv.config();



const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: "mysql",
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        },
        logging: false
    }
);

console.log("DB_NAME =", process.env.DB_NAME);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_HOST =", process.env.DB_HOST);

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise()

module.exports = {sequelize, pool};