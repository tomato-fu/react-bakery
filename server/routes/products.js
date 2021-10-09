const express = require("express");

const router = express.Router();

const db = require("../dbConfig");

//create Product
router.post("/createProduct", (req, res) => {
  const productName = req.body.productName;
  const price = req.body.price;
  const foodCost = req.body.foodCost;
  const timeCost = req.body.timeCost;
  const comment = req.body.comment;

  db.query(
    "INSERT INTO Product (Name, Price, FoodCost, TimeCost,Comment) VALUES(?,?,?,?,?)",
    [productName, price, foodCost, timeCost, comment],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result.insertId.toString());
    }
  );
});

//get Products
router.get("/getProducts", (req, res) => {
  db.query("SELECT * FROM Product", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Product
router.get("/getProduct", (req, res) => {
  const productID = JSON.parse(req.query.productID);

  db.query(
    "CALL fetch_single_product(?)",
    productID.productID,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//delete product
router.delete("/deleteProduct", (req, res) => {
  const productID = req.query.productID;

  db.query(`DELETE FROM Product WHERE ID = ${productID}`, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

module.exports = router;
