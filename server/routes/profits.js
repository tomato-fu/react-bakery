const express = require("express");

const router = express.Router();

const db = require("../dbConfig");

//get order profit and revenue
router.get("/getOrder", (req, res) => {
  db.query("CALL fetch_order_profit()", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get order profit and revenue last month
router.get("/getOrderLastMonth", (req, res) => {
  db.query("CALL fetch_order_profit_lastMonth()", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get sale profit and revenue
router.get("/getSale", (req, res) => {
  db.query("CALL fetch_sale_profit()", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get sale profit and revenue last month
router.get("/getSaleLastMonth", (req, res) => {
  db.query("CALL fetch_sale_profit_lastMonth()", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get order profit and revenue using range
router.get("/getOrderInRange", (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  db.query(
    "CALL fetch_order_profit_in_range(?,?)",
    [startDate, endDate],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//get sale profit and revenue using range
router.get("/getSaleInRange", (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  db.query(
    "CALL fetch_sale_profit_in_range(?,?)",
    [startDate, endDate],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

module.exports = router;
