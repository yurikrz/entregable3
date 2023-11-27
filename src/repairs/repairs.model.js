const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database/database.js')

const Repairs = sequelize.define('repairs',{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending','completed','cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Repairs