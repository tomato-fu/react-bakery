const express = require("express");

const router = express.Router();

const db = require("../dbConfig");

router.post("/createCustomer", (req, res) => {
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

router.get("/getCustomers", (req, res) => {
  db.query("SELECT * FROM Customer", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get customer
router.get("/getCustomer", (req, res) => {
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

//delete customers
router.delete("/deleteCustomers", (req, res) => {
  const customers = req.query.deleteIDs;
  console.log(customers.toString());

  db.query(
    `DELETE FROM Customer WHERE ID in(${customers.toString()})`,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

module.exports = router;
