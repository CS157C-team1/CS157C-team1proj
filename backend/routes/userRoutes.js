const express = require('express')
const router = express.Router()
const User = require('../controllers/user_controllers')
const db = require('../mongoConnection')

router.get('/allUsers', User.getAllUsers)

module.exports = router