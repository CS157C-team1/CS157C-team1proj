const User = require('../models/UserModel')
const { htmlError, getJWT } = require('../helpers');

// Verify that a User has been logged on using the SESSION_TOKEN. Can also reference req.user that contains user information
// anywhere this function has been triggered
const checkUserLoggedIn = async (req, res, next) => {
    let htmlCode = null;
    try{
        const token = req.cookies.SESSION_TOKEN
        if (token) {
            const userInformation = getJWT(token)
            if(userInformation) {
                req.user = await User.getUserByEmailCol(userInformation.email)
                next()
            } else {
                htmlCode = 401
                throw new Error('User information could not be verified')
            }
        } else {
            htmlCode = 401
            throw new Error('User cannot be found to be logged in (Missing Valid Cookie)')
        }
    } catch (error) {
        if(!htmlCode) {
            statusCode = 400;
        }
        res.status(htmlCode).json(htmlError(error.message, htmlCode))
    }
}

module.exports = {checkUserLoggedIn}