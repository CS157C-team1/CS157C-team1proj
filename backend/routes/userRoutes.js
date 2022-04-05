const express = require('express')
const router = express.Router()
const User = require('../controllers/user_controllers')

router.get('/allUsers', User.getAllUsers)

module.exports = router