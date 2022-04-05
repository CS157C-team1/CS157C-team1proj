const { htmlError } = require("../helpers")
const mongoConnection = require("../mongoConnection")
const collection = mongoConnection.collection('users')
let statusCode

getAllUsers = (req, res) => {
    const cursor = collection.find()
    cursor.toArray()
    .then((data) => {
        // res.send(data)
        res.json({
            allUsers: data
        })
        // console.log(data)
    })
    .catch((error) => {
        statusCode = 500
        console.log(error.message)
        res.status(statusCode).json(htmlError(error), statusCode)
    })
}

module.exports = { getAllUsers }