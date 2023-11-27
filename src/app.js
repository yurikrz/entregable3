const express = require('express')
const app = express()
const usersRoutes = require('./users/users.route.js')
const repairsRoutes = require('./repairs/repairs.route.js')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/users',usersRoutes)
app.use('/api/v1/repairs',repairsRoutes)

module.exports = app