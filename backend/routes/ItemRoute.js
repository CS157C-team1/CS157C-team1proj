// Routers
const express = require("express");
const router = express.Router();


// Errors
const { htmlError } = require("../helpers");
let statusCode;

// Item Collection Model
const itemModel = require("../models/ItemModel");

const { checkUserLoggedIn } = require('./AuthUser')

router.get("/getAllItems", checkUserLoggedIn, async (req, res) => {
  // TODO: GET ONLY ITEMS that are for sale. 
  try {
    const data = await itemModel.getAllItems();
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

router.get("/getItem/:_id", checkUserLoggedIn, async(req, res) => {
  try {
    const data = await itemModel.getItem(req.params._id);
    // console.log(data);
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

router.po
module.exports = router;
