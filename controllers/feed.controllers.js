const readXlsxFile = require('read-excel-file/node')
const fs = require('node:fs')
const User = require('../models/User')
const Message = require('../models/Message')

// feed database with data

const feedDB =  async ( req, res) => {

   try {
      await User.sync({ force: true })
      const usersFeed = await readXlsxFile(fs.createReadStream('./seeds.xlsx'), {sheet: 'users'})
      usersFeed.forEach(user => addUsers(user))


      await Message.sync({ force: true })
      const messagesFeed = await readXlsxFile(fs.createReadStream('./seeds.xlsx'), {sheet: 'messages'})
      messagesFeed.forEach( message => addMessages(message))
   
      res.status(201).send("FEED COMPLETED")
      
   } catch (error) {
      console.log(error)
      res.status(400).send("FEED ERROR ", error)
   }

}


// Add users
async function addUsers( user ) {
   await User.create({
         id: user[0],
         firstName: user[1],
         lastName: user[2],
         dateOfBirth: new Date(user[3]),
         gender: user[4],
         username: user[5],
         createdAt: new Date()
      })
}

// Add messages
async function addMessages( message) {
   await Message.create({
      id: message[0],
      content: message[1],
      sender: message[2],
      receiver: message[3],
      seen: message[4],
      timestampSent: new Date(message[5]),
      createdAt: new Date()
   })
}



// 

module.exports = feedDB