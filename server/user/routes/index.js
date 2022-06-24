
const route = require('express').Router()
const UserController = require('../UserController')

route.get('/', UserController.index)
route.post('/', UserController.store)

module.exports = route
