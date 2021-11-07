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

//update product
router.put("/updateProduct", (req, res) => {
  const productID = req.body.productID;
  const productName = req.body.productName;
  const price = req.body.price;
  const foodCost = req.body.foodCost;
  const timeCost = req.body.timeCost;
  const comment = req.body.comment;

  db.query(
    "UPDATE Product SET Name=?, Price=?,FoodCost=?,TimeCost=?,Comment=? WHERE ID=?",
    [productName, price, foodCost, timeCost, comment, productID],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value updated");
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

//get Products by keyWord
router.get("/getProductsKeyWord", (req, res) => {
  const keyWord = req.query.keyWord;
  db.query("CALL fetch_products_keyword(?)", keyWord, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Product total quantity in order
router.get("/getOrderQuantity", (req, res) => {
  const productID = req.query.productID;

  db.query("CALL fetch_product_quantity(?)", productID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
//get Product total quantity in sales
router.get("/getSaleQuantity", (req, res) => {
  const productID = req.query.productID;

  db.query("CALL fetch_product_quantity_sale(?)", productID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Product total quantity in order
router.get("/getOrderQuantityKeyWord", (req, res) => {
  const keyWord = req.query.keyWord;

  db.query("CALL fetch_product_quantity_Keyword(?)", keyWord, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Product related order
router.get("/getOrders", (req, res) => {
  const productID = req.query.productID;

  db.query("CALL fetch_product_orders(?)", productID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Product top customers
router.get("/getTopCustomers", (req, res) => {
  const productID = req.query.productID;

  db.query("CALL fetch_product_top_customer(?)", productID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Product
router.get("/getProduct", (req, res) => {
  const productID = req.query.productID;

  db.query("CALL fetch_single_product(?)", productID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Products Quantity
router.get("/getProductQuantity", (req, res) => {
  db.query("SELECT COUNT(ID) As quantity FROM Product", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get recipe of product
router.get("/getRecipe", (req, res) => {
  const productID = req.query.productID;

  db.query("CALL fetch_product_recipe(?)", productID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
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
