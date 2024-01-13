const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/dbconnect')

const User = sequelize.define('user', {

    id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey: true
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
    },

    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
            notEmpty: true
        }
    }
})

module.exports = User