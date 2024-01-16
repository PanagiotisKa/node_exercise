const router = require('express').Router()
const feedDB = require('../controllers/feed.controllers')
const { getUsers, usersMessagesExchange, usersContacts } = require('../controllers/users.controllers')

// FEED ROUTE
router.post('/feedDB', feedDB)

// Users Route (get with parameters)
router.get('/users', getUsers)

// 2 Users and their messages route
router.get('/user/exchange/:id1/:id2', usersMessagesExchange)

// Contacts of a User 
router.get('/user/contacts/:id', usersContacts)

module.exports = router