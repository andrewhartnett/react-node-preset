const express = require('express')
const UserController = require('./user/UserController')
const route = express.Router()

route.post('/login', UserController.login)
route.post('/register', UserController.store)

module.exports = route
