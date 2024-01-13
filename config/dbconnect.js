const { Sequelize } = require('sequelize')

// Use dotenv
require('dotenv').config()

const sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASSWORD,

   {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT
   }
)



console.log("Try to connect to Database")

try {
    sequelize.authenticate()
    sequelize.sync({ force: true }) // sync
    console.log("Database connection has been established successfully")
    
} catch (error) {
    console.error("Unable to connect to the Database", error)
}


module.exports = sequelize