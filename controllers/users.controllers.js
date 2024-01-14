const User = require('../models/User')
const Message = require('../models/Message')
const { Op } = require('sequelize')
const { Sequelize } = require('sequelize')

const getUsers = async (req, res) => {
    let params = {}
        if (req.query.id !== undefined) params.id = req.query.id
        if (req.query.firstName !== undefined) params.firstName = req.query.firstName
        if (req.query.lastName !== undefined) params.lastName = req.query.lastName
        if (req.query.gender !== undefined) params.gender= req.query.gender
        if (req.query.dateOfBirth !== undefined) params.dateOfBirth = new Date(req.query.dateOfBirth).toISOString()
        if (req.query.createdAt !== undefined) params.createdAt = new Date(req.query.createdAt).toISOString()


        console.log(params)

    try {

        const users = await User.findAll({
            where: params
          })
        res.set('Access-Control-Expose-Headers')
        res.status(200).json(users)
        
        
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
        
    }
}

const usersMessagesExchange = async (req, res) => {

    try {
        const senderId = req.params.id1
        const receiverId = req.params.id2
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { [Op.and]: [{ sender:senderId, receiver: receiverId}] }, 
                    { [Op.and]: [{receiver: senderId,  sender:receiverId}] }
                    ]
            },
            order: [['timestampSent', 'DESC']]
        })

        res.set('Access-Control-Expose-Headers')
        res.status(200).json(messages)
        
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


const usersContacts = async (req, res) => {
    try {
        const userId = req.params.id
        
        // Find the lates messages the user got grouped by sender
        const messagesIn = await Message.findAll({
            where: { receiver: userId},
            group: ['sender'],
            attributes: [['sender', 'contact'], [Sequelize.fn('MAX', Sequelize.col('timestampSent')), 'maxTimestamp']],
            raw: true
            // order: [['maxTimestampSent', 'DESC']]
        })

        // Find the lates messages the user sent grouped by receiver
        const messagesOut = await Message.findAll({
            where: { sender: userId},
            group: ['receiver'],
            attributes: [['receiver','contact'], [Sequelize.fn('MAX', Sequelize.col('timestampSent')), 'maxTimestamp']],
            raw: true
            // order: [['maxTimestampSent', 'DESC']]
        })

 


        // merge latest messages sent and received
        let contacts = [...messagesIn, ...messagesOut]


        // Filter contact that where both senter and reveiver by the latest timestamp
        let result = []
        console.log(contacts)
        for(let i = 0; i< contacts.length; i++) {
            let count = 0
            for(let j = 0; j < contacts.length; j++) {
                if ( i != j) {  
                    if (contacts[i].contact === contacts[j].contact) {
                        count++ 
                        if(contacts[i].maxTimestamp > contacts[j].maxTimestamp) result.push(contacts[i])   
                    }
                }
            }
            if(count == 0) {
                result.push(contacts[i])
            }
            count = 0
        }  

        // sorting result by timestamp
        result.sort((a,b) =>  new Date(b.maxTimestamp) - new Date(a.maxTimestamp))

        res.set('Access-Control-Expose-Headers')
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

}


module.exports = { getUsers, usersMessagesExchange, usersContacts }