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

// Gets list of Item Obj Ids from req and returns back actual Item information
router.get("/getItemsByIds", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const listOfItemObjIds = req.query.listOfItemObjIds;
    if (listOfItemObjIds != null) {
      const cartItemInformation = await itemModel.getItemsByObjId(listOfItemObjIds);
      const totalPrice = await itemModel.getTotalPriceOfItems(data);
      res.json({
        cartItemData: cartItemInformation,
        totalPrice: totalPrice,
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

// Get All Item information Not in the given array of OBJ IDS from request
router.get("/getItemsNotPosted", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const listOfItemObjIds = req.query.listOfitemObjIds;
    console.log(listOfItemObjIds);
    if (listOfItemObjIds != null) {
      const data = await itemModel.getItemsNotIn(listOfItemObjIds);
      res.json({
        itemData: data,
        status: "Ok",
        message: "Able to retrieve Item Information",
      });
    } else {
      // TODO: GET RID OF
      const data = await itemModel.getAllItems();
      res.json({
        itemData: data,
        status: "Ok",
        message: "Able to retrieve Item Information",
      });
      // htmlCode = 400;
      // throw new Error("Missing Item Obj ids");
    }
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

module.exports = router;
