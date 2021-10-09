const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const customers = require("./routes/customers.js");
const ingredients = require("./routes/ingredients.js");
const products = require("./routes/products.js");
const recipes = require("./routes/recipes.js");
app.use("/customers", customers);
app.use("/ingredients", ingredients);
app.use("/products", products);
app.use("/recipes", recipes);

app.listen(3004, () => {
  console.log("running now");
});
