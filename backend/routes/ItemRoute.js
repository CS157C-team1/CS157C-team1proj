// Routers
const e = require("express");
const express = require("express");
const router = express.Router();

// Errors
const { htmlError } = require("../helpers");
let statusCode;

// Item Collection Model
const itemModel = require("../models/ItemModel");
const userModel = require("../models/UserModel");

const { checkUserLoggedIn } = require("./AuthUser");

router.post("/addItem", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null
  try {
    const itemInfo = req.body
    itemInfo.seller = req.user._id
    const itemId = await itemModel.addItem(itemInfo)
    await userModel.addItemToPosted(req.user._id, itemId.insertedId)
    res.json({
      status: "Ok",
      message: "Item added to User Posted",
    });
  } catch (error ) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
})

router.get("/getAllItems", checkUserLoggedIn, async (req, res) => {
  // TODO: GET ONLY ITEMS that are for sale.
  try {
    const data = await itemModel.getAllItems();
    res.json({
      itemArray: data,
    });
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error));
  }
});

router.get("/getItem/:_id", checkUserLoggedIn, async (req, res) => {
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

router.get("/searchItems", checkUserLoggedIn, async (req, res) => {
  try {

    // Get Info the user that wants to search for Items
    const userInfo = await userModel.getUserByObjectId(req.query.userId)
    const allItems = await itemModel.getAllItems()

    let listItemIds = allItems.map((elem) => elem._id)
    // console.log(listItemIds)
    // Depending on display type, get that list for from user information
    if (req.query.displayType === "posted") {
      listItemIds = userInfo.items_post
    } else if (req.query.displayType === "wishlist") {
      listItemIds = userInfo.wishlist
    } else if (req.query.displayType === "bought") {
      listItemIds = userInfo.items_bought
    }
    console.log
    data = await itemModel.searchItems(req.query.input, req.query.type, listItemIds);
    res.json({
      itemData: data,
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
      cartItemInformation = await itemModel.getItemsByObjId(listOfItemObjIds);
      totalPrice = await itemModel.getTotalPriceOfItems(cartItemInformation);
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

// Get All Item Information for Display to User Logged ON(Not Posted By User)
router.get("/getItemsForDisplay", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const userInfo = await userModel.getUserByObjectId(req.user._id);
    const listOfPostedItems = userInfo.items_post;
    const data = await itemModel.getItemsForDisplay(listOfPostedItems);
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

// Get All Item Information for a wishlist of a given user
router.get("/getWishList", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const userInfo = await userModel.getUserByObjectId(req.query.userId);
    const wishlist = userInfo.wishlist;
    const data = await itemModel.getItemsByObjId(wishlist);
    res.json({
      wishList: data,
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

// Get All Item Information of bought items of a given user
router.get("/getItemsBought", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const userInfo = await userModel.getUserByObjectId(req.query.userId);
    const listOfBoughtItems = userInfo.items_bought;
    const data = await itemModel.getItemsByObjId(listOfBoughtItems);
    res.json({
      itemsBought: data,
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
