const router = require('express').Router()
const feedDB = require('../controllers/feed.controllers')
const { getUsers } = require('../controllers/users.controllers')

// FEED ROUTE
router.post('/feedDB', feedDB)

// Users Route (get with parameters)
router.get('/users', getUsers)

// 2 Users and their messages route
router.get('/user/exchange/:id1/:id2')

// 1 User and messages with others route
router.get('/user/messages/:id')

module.exports = router