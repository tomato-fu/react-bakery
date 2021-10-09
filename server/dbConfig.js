const mysql = require("mysql");

const config = {
  user: "root",
  host: "localhost",
  password: "Hjh103131./",
  database: "bakery",
};

const db = mysql.createConnection(config);

module.exports = db;
