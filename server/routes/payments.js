const express = require("express");

const router = express.Router();

const db = require("../dbConfig");

//get payment types
router.get("/getPaymentTypes", (req, res) => {
  db.query("SELECT * FROM Payment_Type", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//create payment
router.post("/createPayement", (req, res) => {
  const orderID = req.body.orderID;
  const PaymentTypeID = req.body.PaymentTypeID;
  const Amount = req.body.Amount;

  db.query(
    "INSERT INTO Payment(order_id, Payment_Type_ID,Amount) VALUES(?,?,?)",
    [orderID, PaymentTypeID, Amount],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value inserted");
    }
  );
});

//delete payment
router.delete("/deletePayment", (req, res) => {
  const orderID = req.query.orderID;

  db.query(`DELETE FROM Payment WHERE order_id=${orderID}`, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

module.exports = router;
