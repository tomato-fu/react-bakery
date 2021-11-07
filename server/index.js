const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const PORT = 3004;
const customers = require("./routes/customers.js");
const ingredients = require("./routes/ingredients.js");
const products = require("./routes/products.js");
const recipes = require("./routes/recipes.js");
const payments = require("./routes/payments.js");
const orders = require("./routes/orders.js");
const sales = require("./routes/sales.js");
const profits = require("./routes/profits.js");
app.use("/customers", customers);
app.use("/ingredients", ingredients);
app.use("/products", products);
app.use("/recipes", recipes);
app.use("/payments", payments);
app.use("/orders", orders);
app.use("/sales", sales);
app.use("/profits", profits);

app.listen(process.env.PORT || PORT, () => {
  console.log("running now");
});
