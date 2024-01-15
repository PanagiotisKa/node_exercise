const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/dbconnect')
const User = require('./User')

const Message = sequelize.define('message', {

    id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },

    content: {
        type: DataTypes.TEXT
    },

    sender: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull:false,
    },

    receiver: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull:false,
    },

    seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    timestampSent : {
        type: DataTypes.DATE,
        allowNull: false
    }
})


module.exports = Message