const mysql = require("mysql");
require("dotenv").config();
const config = {
  user: process.env.USERNAME,
  host: "localhost",
  password: process.env.PASSWORD,
  database: "bakery",
};

const db = mysql.createConnection(config);

module.exports = db;
