// Routers
const express = require("express");
const router = express.Router();

// Errors
const { htmlError } = require("../helpers");
let statusCode;

// Item Collection Model
const itemModel = require("../models/item_model");

router.get("/getAllItems", async (req, res) => {
  try {
    const data = await itemModel.getAllItems();
    // console.log(data)
    res.json({
      itemArray: data,
    });
  } catch (error) {
    if (!statusCode) {
      statusCode = 422;
    }
    res.status(statusCode).json(htmlError(error));
  }
});

module.exports = router;
