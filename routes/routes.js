const router = require('express').Router()

//Test Route
router.get('/test', (req, res) => { res.send("TEST!!")})

// FEED ROUTE
router.post('feedDB')

// Users Route (get with parameters)
router.get('/users')

// 2 Users and their messages route
router.get('/usersandmessages/:id1/:id2')

// 1 User and messages with others route
router.get('/user/:id')

module.exports = router