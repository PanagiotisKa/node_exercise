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

    try {
        const users = await User.findAll({
            where: params
          })
        res.set('Access-Control-Expose-Headers')
        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json({
            status: "ERROR", 
            message: error.message
         })
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
        res.status(500).json({
            status: "ERROR", 
            message: error.message
         })
    }
}

const usersContacts = async (req, res) => {
    try {
        const userId = req.params.id
        
        // Find the lates messages the user got grouped by sender
        const messagesIn = await Message.findAll({
            where: { receiver: userId},
            group: ['sender'],
            attributes: [['sender', 'contactId'], [Sequelize.fn('MAX', Sequelize.col('timestampSent')), 'maxTimestamp']],
            raw: true
            // order: [['maxTimestampSent', 'DESC']]
        })

        // Find the lates messages the user sent grouped by receiver
        const messagesOut = await Message.findAll({
            where: { sender: userId},
            group: ['receiver'],
            attributes: [['receiver','contactId'], [Sequelize.fn('MAX', Sequelize.col('timestampSent')), 'maxTimestamp']],
            raw: true
            // order: [['maxTimestampSent', 'DESC']]
        })

        // merge latest messages sent and received
        let contacts = [...messagesIn, ...messagesOut]

        // Filter contact that where both senter and reveiver by the latest timestamp
        let result = []
        for(let i = 0; i< contacts.length; i++) {
            let count = 0
            for(let j = 0; j < contacts.length; j++) {
                if ( i != j) {  
                    if (contacts[i].contactId === contacts[j].contactId) {
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

        // Get Names of contacts
        for(let i=0; i < result.length; i++){
            const user = await User.findByPk(result[i].contactId, {raw: true})
            if(user.id != undefined) {
                result[i]['firstName'] = user.firstName
                result[i]['lastName'] = user.lastName
            }
        }

        res.set('Access-Control-Expose-Headers')
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({
            status: "ERROR", 
            message: error.message
         })
    }
}

module.exports = { getUsers, usersMessagesExchange, usersContacts }