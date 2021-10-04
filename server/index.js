const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "bakery",
});

app.post("/createCustomer", (req, res) => {
  const CustomerName = req.body.customerName;
  const WeChatID = req.body.wechatID;
  const phoneNumber = req.body.phoneNumber;
  const joinDate = req.body.joinDate;
  const addressOne = req.body.addressOne;
  const addressTwo = req.body.addressTwo;
  const city = req.body.city;
  const zip = req.body.zip;
  const comment = req.body.comment;

  db.query(
    "INSERT INTO Customer (CustomerName, WechatID, phoneNumber, joinDate, addressOne, addressTwo, city, zip, comment) VALUES(?,?,?,?,?,?,?,?,?)",
    [
      CustomerName,
      WeChatID,
      phoneNumber,
      joinDate,
      addressOne,
      addressTwo,
      city,
      zip,
      comment,
    ],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value Inserted");
    }
  );
});

app.get("/getCustomers", (req, res) => {
  db.query("SELECT * FROM Customer", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/getCustomer", (req, res) => {
  const customerID = JSON.parse(req.query.customerID);

  db.query(
    "CALL fetch_customer_info(?)",
    customerID.customerID,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.listen(3004, () => {
  console.log("running now");
});
