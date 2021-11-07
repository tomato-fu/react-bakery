const express = require("express");

const router = express.Router();

const db = require("../dbConfig");

//create order
router.post("/createOrder", (req, res) => {
  const customer = req.body.customer;
  const placedDate = req.body.placedDate;
  const pickTime = req.body.pickTime;
  const fullFilled = req.body.fullFilled;
  const comment = req.body.comment;
  const amount = req.body.amount;

  db.query(
    "INSERT INTO `Order` (Customer_ID, DatePlaced, PickupTime,Fulfilled,Comment,Amount) VALUES(?,?,?,?,?,?)",
    [customer, placedDate, pickTime, fullFilled, comment, amount],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result.insertId.toString());
    }
  );
});

//update order
router.put("/updateOrder", (req, res) => {
  const orderID = req.body.orderID;
  const customer = req.body.customer;
  const placedDate = req.body.placedDate;
  const pickTime = req.body.pickTime;
  const fullFilled = req.body.fullFilled;
  const comment = req.body.comment;
  const amount = req.body.amount;

  db.query(
    "UPDATE `Order` SET Customer_ID=?, DatePlaced=?,PickupTime=?,Fulfilled=?,Comment=?, Amount=? WHERE ID=?",
    [customer, placedDate, pickTime, fullFilled, comment, amount, orderID],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value updated");
    }
  );
});

//fulfill order
router.put("/fulfillOrder", (req, res) => {
  const orderID = req.body.orderID;
  const fullFilled = req.body.fullFilled;

  db.query(
    "UPDATE `Order` SET Fulfilled=? WHERE ID=?",
    [fullFilled, orderID],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value updated");
    }
  );
});

//create orderDetail
router.post("/createOrderDetail", (req, res) => {
  const orderID = req.body.orderID;
  const productID = req.body.productID;
  const quantity = req.body.quantity;
  const comment = req.body.comment;
  const priceAtSale = req.body.priceAtSale;
  const foodCostAtSale = req.body.foodCostAtSale;

  db.query(
    "INSERT INTO Order_Details (order_id, product_id,PriceAtSale, FoodCostAtSale, Quantity, Comment) VALUES(?,?,?,?,?,?)",
    [orderID, productID, priceAtSale, foodCostAtSale, quantity, comment],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value inserted");
    }
  );
});

//get Orders
router.get("/getOrders", (req, res) => {
  db.query("CALL fetch_all_orders()", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get unfulfilled Orders
router.get("/getLastedOrders", (req, res) => {
  db.query(
    "SELECT o.ID, DatePlaced, c.ID as CustomerID,PickupTime, Fulfilled,o.Comment,CustomerName FROM `Order` o JOIN Customer c ON c.ID = Customer_ID WHERE Fulfilled=0",
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//get current Orders
router.get("/getOrdersCurrent", (req, res) => {
  db.query(
    "SELECT COUNT(ID) as quantity FROM `Order` WHERE Fulfilled=0",
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//get total Orders products quantity
router.get("/getTotalOrdersQuantity", (req, res) => {
  db.query(
    "SELECT SUM(Quantity) as ordersQuantity FROM Order_Details",
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//get Orders by range
router.get("/getOrdersByRange", (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const keyWord = req.query.keyWord;

  db.query(
    "CALL fetch_orders_in_range(?,?,?)",
    [startDate, endDate, keyWord],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//get Single Order
router.get("/getOrder", (req, res) => {
  const orderID = req.query.orderID;
  db.query("CALL fetch_single_order(?)", orderID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Single Order payment
router.get("/getOrderPayment", (req, res) => {
  const orderID = req.query.orderID;
  console.log(orderID);
  db.query("CALL fetch_single_order_payments(?)", orderID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get Single Order product
router.get("/getOrderProduct", (req, res) => {
  const orderID = req.query.orderID;
  console.log(orderID);
  db.query("CALL fetch_single_order_details(?)", orderID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//delete orders
router.delete("/deleteOrders", (req, res) => {
  const orders = req.query.deleteIDs;

  db.query(
    `DELETE FROM \`Order\` WHERE ID in(${orders.toString()})`,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});
//delete order detail
router.delete("/deleteOrderDetail", (req, res) => {
  const orderID = req.query.orderID;

  db.query(
    `DELETE FROM Order_Details WHERE order_id = ${orderID} `,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

module.exports = router;
