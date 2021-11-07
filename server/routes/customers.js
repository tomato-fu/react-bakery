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

//update customer
router.put("/updateCustomer", (req, res) => {
  const customerID = req.body.customerID;
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
    "UPDATE Customer SET customerName=?, WeChatID=?,phoneNumber=?,joinDate=?,addressOne=?, addressTwo=?, city=?,zip=?,Comment=? WHERE ID=?",
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
      customerID,
    ],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value updated");
    }
  );
});

router.get("/getCustomers", (req, res) => {
  db.query("SELECT * FROM Customer", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

router.get("/getCustomersQuantity", (req, res) => {
  db.query("SELECT COUNT(ID) As quantity FROM Customer", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

router.get("/getCustomersKeyWord", (req, res) => {
  const keyWord = req.query.keyWord;
  db.query("CALL fetch_customers_keyword(?)", keyWord, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get customer
router.get("/getCustomer", (req, res) => {
  const customerID = req.query.customerID;

  db.query("CALL fetch_customer_info(?)", customerID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get customer favoriate products
router.get("/getFavoProduct", (req, res) => {
  const customerID = req.query.customerID;

  db.query("CALL fetch_customer_favorites(?)", customerID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get customer points
router.get("/getPoints", (req, res) => {
  const customerID = req.query.customerID;

  db.query("CALL fetch_customer_points(?)", customerID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get customer orders
router.get("/getOrders", (req, res) => {
  const customerID = req.query.customerID;

  db.query("CALL fetch_customer_orders(?)", customerID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get customer total number of orders
router.get("/getNumOrder", (req, res) => {
  const customerID = req.query.customerID;
  const stmt = `SELECT COUNT(ID) as numOrder From \`Order\` o WHERE Customer_ID = ${customerID};`;
  db.query(stmt, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Orders by keyword
router.get("/getOrdersByRange", (req, res) => {
  const keyWord = req.query.keyWord;

  db.query("CALL fetch_orders_in_range(?,?,?)", [keyWord], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//delete customers
router.delete("/deleteCustomers", (req, res) => {
  const customers = req.query.deleteIDs;

  db.query(
    `DELETE FROM Customer WHERE ID in(${customers.toString()})`,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

module.exports = router;
