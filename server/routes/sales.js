const express = require("express");

const router = express.Router();

const db = require("../dbConfig");

//create sale
router.post("/createSale", (req, res) => {
  const date = req.body.date;
  const hours = req.body.hours;
  const comment = req.body.comment;

  db.query(
    "INSERT INTO Sales_Report (Date, Hours,Comment) VALUES(?,?,?)",
    [date, hours, comment],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result.insertId.toString());
    }
  );
});
//update sale
router.put("/updateSale", (req, res) => {
  const saleID = req.body.saleID;
  const date = req.body.date;
  const hours = req.body.hours;
  const comment = req.body.comment;

  db.query(
    "UPDATE Sales_Report SET Date=?, Hours=?, Comment=? WHERE ID=?",
    [date, hours, comment, saleID],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result.insertId.toString());
    }
  );
});

//create sale detail
router.post("/createSaleDetail", (req, res) => {
  const saleID = req.body.saleID;
  const productID = req.body.productID;
  const startQuantity = req.body.startQuantity;
  const soldQuantity = req.body.soldQuantity;
  const trashQuantity = req.body.trashQuantity;
  const foodCostAtSale = req.body.foodCostAtSale;
  const priceAtSale = req.body.priceAtSale;

  db.query(
    "INSERT INTO Sales_Report_Details (Sales_Report_ID, product_id,StartQuantity, QuantitySold, QuantityTrashed, PriceAtSale, FoodCostAtSale) VALUES(?,?,?,?,?,?,?)",
    [
      saleID,
      productID,
      startQuantity,
      soldQuantity,
      trashQuantity,
      priceAtSale,
      foodCostAtSale,
    ],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value inserted");
    }
  );
});

//get sales
router.get("/getSales", (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  db.query(
    "CALL fetch_all_sales_in_range(?,?)",
    [startDate, endDate],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//get sales in range
router.get("/getSalesInRange", (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  db.query(
    "CALL fetch_sales_in_range(?,?)",
    [startDate, endDate],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//get Single sale
router.get("/getSale", (req, res) => {
  const saleID = req.query.saleID;

  db.query("CALL fetch_single_sale(?)", saleID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get sales last 14 days
router.get("/getSalesLast14", (req, res) => {
  db.query("CALL fetch_sales_two_weeks()", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get total sales quantity
router.get("/getTotalSalesQuantity", (req, res) => {
  db.query(
    "SELECT SUM(QuantitySold) as salesQuantity FROM Sales_Report_Details",
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//get single sale without profit, revenue, and lost
router.get("/getSaleNoProfit", (req, res) => {
  const saleID = req.query.saleID;
  console.log(saleID);
  db.query("SELECT * FROM Sales_Report WHERE ID=?", saleID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Single sale details
router.get("/getProducts", (req, res) => {
  const saleID = req.query.saleID;

  db.query("CALL fetch_single_sale_details(?)", saleID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//delete sales detail
router.delete("/deleteSaleDetail", (req, res) => {
  const reportID = req.query.reportID;

  db.query(
    `DELETE FROM Sales_Report_Details WHERE Sales_Report_ID = ${reportID}`,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//delete sales
router.delete("/deleteSales", (req, res) => {
  const sales = req.query.deleteIDs;

  db.query(
    `DELETE FROM Sales_Report WHERE ID in(${sales.toString()})`,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});
module.exports = router;
