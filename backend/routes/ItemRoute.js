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

    let cartItemInformation = null;
    let totalPrice = 0;
    // Set to false if obj list is empty in the front end
    if (listOfItemObjIds === "false") {
      cartItemData = [];
    } else if (listOfItemObjIds != null) {
      cartItemInformation = await itemModel.getItemsByObjId(
        listOfItemObjIds
      );
      totalPrice = await itemModel.getTotalPriceOfItems(
        cartItemInformation
      );
    } else {
      htmlCode = 400;
      throw new Error("Missing Item Obj ids");
    }

    res.json({
      cartItemData: cartItemInformation,
      totalPrice: totalPrice,
      status: "Ok",
      message: "Able to retrieve Item Information",
    });
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

// Get All Item Information for Display to User (Not Posted By User, Not Sold Yet)
router.get("/getItemsForDisplay", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  let data = null;
  try {
    const listOfItemObjIds = req.query.listOfitemObjIds;
    // Item Obj Id has not been set
    if (listOfItemObjIds === "false") {
      data = await itemModel.getAllItems();
    } else if (listOfItemObjIds != null) {
      data = await itemModel.getItemsNotIn(listOfItemObjIds);
    } else {
      htmlCode = 400;
      throw new Error("Missing Item Obj ids");
    }

    res.json({
      itemData: data,
      status: "Ok",
      message: "Able to retrieve Item Information",
    });
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

module.exports = router;
