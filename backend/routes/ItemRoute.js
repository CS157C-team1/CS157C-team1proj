// Routers
const express = require("express");
const router = express.Router();

// Errors
const { htmlError } = require("../helpers");
let statusCode;

// Item Collection Model
const itemModel = require("../models/ItemModel");

const { checkUserLoggedIn } = require("./AuthUser");

router.get("/getAllItems", checkUserLoggedIn, async (req, res) => {
  // TODO: GET ONLY ITEMS that are for sale.
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

router.get("/getItemsByIds", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const listOfItemObjIds = req.query.listOfItemObjIds;
    if (listOfItemObjIds != null) {
      const data = await itemModel.getItemsByObjId(listOfItemObjIds);
      res.json({
        cartItemData: data,
        status: "Ok",
        message: "Able to retrieve Item Information",
      });
    } else {
      htmlCode = 400;
      throw new Error("Missing Item Obj ids");
    }
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

module.exports = router;
