const JWT = require('jsonwebtoken')

const HTML_ERROR_CODES = {
    400: 'Bad Request',
    401: 'Not Authorized',
    404: 'Not Found',
    500: 'Internal Server Error'
}
const htmlError = (message, statusCode) =>  {
    return {
        error: {
            message,
            type: statusCode ? HTML_ERROR_CODES : HTML_ERROR_CODES[422]
        }
    }
}

const createJWT = (objectID, email, firstName, lastName, profile_pic_url) => {
    return JWT.sign({objectID, email, firstName, lastName, profile_pic_url}, process.env.JWT_CODE, {expiresIn: '30d'});
}

const getJWT = (token) => {
    try{
        return JWT.verify(token, process.env.JWT_CODE)
    } catch (error) {
        return null
    }
}
module.exports = { htmlError, createJWT, getJWT } 