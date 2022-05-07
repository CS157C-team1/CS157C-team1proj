const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const { checkUserLoggedIn } = require("./AuthUser");

// Link: /api/user/...

// router.get('/allUsers', User.getAllUsers)

// Add item to Cart of the User using the ObjectID
router.post("/addCart/:itemId", checkUserLoggedIn, async (req, res) => {
  let htmlCode = null;
  try {
    const itemId = req.body.itemId;
    if (itemId) {
      User.addItemToCart(req.user._id.toString(), itemId);
    } else {
      htmlCode = 400;
      throw new Error("Missing Item ID");
    }
  } catch (error) {
    if (!htmlCode) {
      htmlCode = 422;
    }
    res.status(htmlCode).json(jsonError(error.message, htmlCode));
  }
});

module.exports = router;
