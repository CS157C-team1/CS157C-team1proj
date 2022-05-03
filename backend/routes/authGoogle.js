// Router
const express = require("express");
const router = express.Router();

// Controller
const AuthController = require("../controllers/auth_controller");

// Google Dependencies
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);

// Access User Collection of MongoDB
const UserCollection = require("../models/user_model");

// General Helpers
const { htmlError, createJWT } = require("../helpers");
let statusCode;

// Get user information from token acquired from google services.
// Constains basic information about the user.
const getGooglePayload = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENTID,
    });

    const payload = ticket.getPayload();
    return payload;
  } catch (e) {
    return null;
  }
};

// Log in
router.post("/login", async (req, res) => {
  try {
    const { token } = req.body;
    // console.log(token)
    if (token) {
      const payload = await getGooglePayload(token);
      if (payload) {
        const user = {
          first_name: payload.given_name,
          last_name: payload.family_name,
          email: payload.email,
        };

        // TODO: FIND BETTER IMPLEMENTATION FOR STORING OBJECT ID WITH SESSION TOKEN
        // Add User to database if their email is not within the user database.
        // console.log(await UserCollection.getUserByEmailCol(payload.email))
        if ((await UserCollection.getUserByEmailCol(payload.email)) === null) {
          await UserCollection.insertUserCol(user);
          console.log("NEW USER ADDED");
        }

        const userDB = await UserCollection.getUserByEmailCol(payload.email);
        // Create cookie named SESSION_TOKEN that has been encrypted with JWT. Ensure that user stays logged on.
        res.cookie(
          "SESSION_TOKEN",
          createJWT(
            userDB.ObjectID,
            userDB.email,
            userDB.first_name,
            userDB.last_name
          ),
          {
            maxAge: 365 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
          }
        );

        res.json({
          status: "ok",
        });
      } else {
        statusCode = 400;
        throw new Error("Invalid Token");
      }
    } else {
      statusCode = 400;
      throw new Error("Token Field is missing");
    }
  } catch (error) {
    if (!statusCode) {
      statusCode = 422;
    }

    res.status(statusCode).json(htmlError(error));
  }
});

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
