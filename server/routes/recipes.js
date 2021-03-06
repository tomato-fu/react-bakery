const express = require("express");

const router = express.Router();

const db = require("../dbConfig");

//create recipe
router.post("/createRecipe", (req, res) => {
  const productID = req.body.productID;
  const comment = req.body.comment;

  db.query(
    "INSERT INTO Recipe VALUES(?,?)",
    [productID, comment],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value Inserted");
    }
  );
});

//create recipe_ingredient
router.post("/createRecipeIngredient", (req, res) => {
  const recipeID = req.body.recipeID;
  const ingredientID = req.body.ingredientID;
  const grams = req.body.grams;

  db.query(
    "INSERT INTO Recipe_Ingredient VALUES(?,?,?)",
    [recipeID, ingredientID, grams],
    (err, result) => {
      if (err) console.log(err);
      else res.send("value Inserted");
    }
  );
});

//delete recipe_ingredient
//delete order detail
router.delete("/deleteRecipeDetail", (req, res) => {
  const recipeID = req.query.recipeID;

  db.query(
    `DELETE FROM Recipe_Ingredient WHERE Recipe_ID = ${recipeID} `,
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

module.exports = router;
