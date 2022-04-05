// Router
const express = require("express");
const router = express.Router();

// Controller
const AuthController = require("../controllers/auth_controller");

// Log in
router.post("/login", AuthController.googleLogin);

// Get Browser Cookie
router.get("/getCookie", (req, res) => {
  // console.log(req.cookies)
  res.json({
    status: "ok",
    cookies: req.cookies,
  });
});

router.delete("/logout", (req, res) => {
  res.clearCookie("SESSION_TOKEN");
  res.json({
    status: "ok",
  });
});

module.exports = router;
