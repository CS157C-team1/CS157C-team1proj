const express = require("express");
const { htmlError } = require("../helpers");
const router = express.Router();
const User = require("../models/UserModel");
const { checkUserLoggedIn } = require("./AuthUser");

// Link: /api/user/...

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

router.delete("/deleteCart/:itemId", checkUserLoggedIn, (req, res) => {
  let htmlCode = null;
  try {
    const itemId = req.params.itemId;
    if(itemId) {
      User.removeItemFromCart(req.user._id.toString(), itemId)
      res.json({
        status: "Ok",
        message: "Item successfully deleted from Cart"
      })
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
    console.log(data);
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
    if(itemId) {
      User.removeItemsFromWishList(req.user._id.toString(), itemId)
      res.json({
        status: "Ok",
        message: "Item successfully deleted from Wish List"
      })
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

module.exports = router;
