const express = require('express')
const router = express.Router()

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENTID)

getGooglePayload = async (token) => {
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

router.post('/login', async (req, res) => {
    try {
        const { token } = req.body
        if(token) {
            const payload = await getGooglePayload(token)
            if (payload) {
                res.status(201) 
                console.log("Added user to DB")
            } else {
                console.log("Could not get Google payload")
            }
        }
    } catch (error) {
        console.log("Could not connect to db")
    }
}) 

module.exports = router