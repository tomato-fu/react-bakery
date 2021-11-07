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

//udpate ingredient
router.put("/updateIngredient", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const note = req.body.note;
  const ingredientID = req.body.ingredientID;

  db.query(
    "UPDATE Ingredient SET Name=?,PricePerKG=?,Note=? WHERE ID=?",
    [name, price, note, ingredientID],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value udpate");
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

//get ingredients by key word
router.get("/getIngredientsKeyWord", (req, res) => {
  const keyWord = req.query.keyWord;
  db.query("CALL fetch_ingredients_keyword(?)", keyWord, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get ingredient
router.get("/getIngredient", (req, res) => {
  const ingredientID = req.query.ingredientID;

  db.query("CALL fetch_ingredient_info(?)", ingredientID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get ingredient quantity
router.get("/getIngredientQuantity", (req, res) => {
  db.query("SELECT COUNT(ID) as quantity FROM Ingredient", (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//get related products
router.get("/getRelatedProducts", (req, res) => {
  const ingredientID = req.query.ingredientID;

  db.query("CALL fetch_ingredient_products(?)", ingredientID, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
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
