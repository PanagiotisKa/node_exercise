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
        const user = req.params.id
        
        const messages = await Message.findAll({
            where: { receiver: user},
            group: ['sender'],
            attributes: ['sender', [Sequelize.fn('MAX', Sequelize.col('timestampSent')), 'maxTimestampSent']],
            // include: [{
            //     model: User,
            //     where: ["sender = id"]
            //    }],
            order: [['maxTimestampSent', 'DESC']]
        })

        res.set('Access-Control-Expose-Headers')
        res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

}


module.exports = { getUsers, usersMessagesExchange, usersContacts }