// Google Dependencies
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENTID)

// Mongo DB Dependency
const mongoConnection = require("../mongoConnection")
const userCollection = mongoConnection.collection('users')

// General Helpers
const { htmlError } = require("../helpers")
let statusCode

// Get user information from token acquired from google services.
// Constains basic information about the user.
const getGooglePayload = async (token) => {
    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENTID
        })

        const payload = ticket.getPayload();
        return payload
    } catch (e) {
        return null
    }
}

// User is Logged into the the Application. User is added to the the database. 
// TODO: Create SESSION TOKEN FOR PERSISTENT LOGIN
// TODO: CHECK IF USER IS ALREADY IN THE SYSTEM BEFORE ADDING THEM
const googleLogin = async (req, res) => {
    try {
        const { token } = req.body
        // console.log(token)
        if(token) {
            const payload = await getGooglePayload(token)
            if (payload) {
                const user = {
                    first_name: payload.given_name,
                    last_name: payload.family_name,
                    email: payload.email
                }
                userCollection.insertOne(user)
                .then((result) => {
                    res.json({
                        status: ok
                    })
                }).catch((error) => {
                    statusCode = 500
                    res.status(statusCode).json(htmlError(error), statusCode)
                })
                // console.log(user)
                // console.log(payload) 
                // console.log("Added user to DB")
            } else {
                console.log("Could not get Google payload")
            }
        }
    } catch (error) {
        console.log("Could not connect to db")
    }
}

module.exports = {googleLogin, getGooglePayload}