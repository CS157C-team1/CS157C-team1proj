const express = require("express");
const { htmlError } = require("../helpers");
const router = express.Router();
const User = require("../models/UserModel");
const { checkUserLoggedIn } = require("./AuthUser");

// Link: /api/user/...

router.get("/getUserById", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const userData = await User.getUserByObjectId(req.query.userId);
    console.log(userData);
    if (userData) {
      res.json({
        userInfo: userData,
        status: "Ok",
        message: "User Info Retrieved",
      });
    } else {
      htmlCode = 400;
      throw new Error("Could not find User");
    }
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

// Add item to Cart of the User using the ObjectID
router.post("/addCart/:itemId", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const itemId = req.body.itemId;
    if (itemId) {
      User.addItemToCart(req.user._id.toString(), itemId);
      res.json({
        status: "Ok",
        message: "Item added to Cart",
      });
    } else {
      htmlCode = 400;
      throw new Error("Missing Item ID");
    }
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

// Retrieve Only the Obj ids of All items in the cart
router.get("/getCart", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const data = await User.getItemsInCart(req.user._id.toString());
    res.json({
      cartItems: data[0].itemCart,
      status: "Ok",
      message: "All Items retrieved from Cart",
    });
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

router.get("/getUserLoggedOn", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    res.json({
      userInfo: req.user,
      status: "Ok",
      message: "User Information Successfully Retrieved",
    });
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

// Retrieve Only the Obj ids Of All items in the wishlist
router.delete("/deleteCart/:itemId", checkUserLoggedIn, (req, res) => {
  let htmlCode = null;
  try {
    const itemId = req.params.itemId;
    if (itemId) {
      User.removeItemFromCart(req.user._id.toString(), itemId);
      res.json({
        status: "Ok",
        message: "Item successfully deleted from Cart",
      });
    } else {
      htmlCode = 400;
      throw new Error("Missing Item ID");
    }
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

router.post("/addWish/:itemId", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const itemId = req.body.itemId;
    if (itemId) {
      User.addItemToWishList(req.user._id.toString(), itemId);
      res.json({
        status: "Ok",
        message: "Item added to Wish List",
      });
    } else {
      htmlCode = 400;
      throw new Error("Missing Item ID");
    }
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

router.get("/getWishList", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const data = await User.getItemsInWishList(req.user._id.toString());
    res.json({
      wishListItems: data[0].wishlist,
      status: "Ok",
      message: "All Items retrieved from Wish List",
    });
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

router.delete("/deleteWish/:itemId", checkUserLoggedIn, (req, res) => {
  let htmlCode = null;
  try {
    const itemId = req.params.itemId;
    if (itemId) {
      User.removeItemsFromWishList(req.user._id.toString(), itemId);
      res.json({
        status: "Ok",
        message: "Item successfully deleted from Wish List",
      });
    } else {
      htmlCode = 400;
      throw new Error("Missing Item ID");
    }
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

router.get("/getItemsPosted", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const data = await User.getItemsFromPosted(req.user._id.toString());
    // Check If data is only has an array of empty json object
    if (Object.keys(data[0]).length === 0) {
      res.json({
        itemsPosted: [],
        status: "Ok",
        message: "All Items Posted by User Retrieved",
      });
    } else {
      res.json({
        itemsPosted: data[0].items_post,
        status: "Ok",
        message: "All Items Posted by User Retrieved",
      });
    }
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(htmlError(error.message, htmlCode));
  }
});

module.exports = router;
