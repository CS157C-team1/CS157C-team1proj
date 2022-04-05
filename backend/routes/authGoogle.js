// Router
const express = require('express')
const router = express.Router()

// Controller
const AuthController = require('../controllers/auth_controller')
router.post('/login', AuthController.googleLogin) 

module.exports = router