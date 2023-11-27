const {Sequelize} = require('sequelize')
const {envs} = require('./../enviroment/enviroment.js')

const sequelize = new Sequelize(envs.DB_URI, {
    logging: false
})

const authenticated= async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.log(error)
    }

}

const syncUp = async ()=>{
    try {
        await sequelize.sync()
        console.log("Connection has been synced successfully.")
    } catch (error) {
        console.log(error)
    }  
}

module.exports = {
    authenticated,
    syncUp,
    sequelize,
}