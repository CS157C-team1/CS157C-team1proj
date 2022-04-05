const HTML_ERROR_CODES = {
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Internal Server Error'
}
htmlError = (message, statusCode) =>  {
    return {
        error: {
            message,
            type: statusCode ? HTML_ERROR_CODES : HTML_ERROR_CODES[422]
        }
    }
}

module.exports = { htmlError } 