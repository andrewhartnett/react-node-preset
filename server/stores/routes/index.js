
const route = require('express').Router()
const StoresController = require('../StoresController')

route.get('/', StoresController.index)
route.get('/:id', StoresController.show)

route.use(require('../../user/UserMiddleware'))
route.post('/', StoresController.store)
route.post('/:id/vote', StoresController.vote)

module.exports = route
