const express = require("express");

const router = express.Router();

const db = require("../dbConfig");

//create ingredient
router.post("/createIngredient", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const note = req.body.note;

  db.query(
    "INSERT INTO Ingredient (Name, PricePerKG, Note) VALUES(?,?,?)",
    [name, price, note],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value Inserted");
    }
  );
});

//get ingredients
router.get("/getIngredients", (req, res) => {
  db.query("SELECT * FROM Ingredient", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get ingredient
router.get("/getIngredient", (req, res) => {
  const ingredientID = JSON.parse(req.query.ingredientID);

  db.query(
    "CALL fetch_ingredient_info(?)",
    ingredientID.ingredientID,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

//delete ingredients
router.delete("/deleteIngredients", (req, res) => {
  const ingredients = req.query.deleteIDs;

  db.query(
    `DELETE FROM Ingredient WHERE ID in(${ingredients.toString()})`,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

module.exports = router;
