const express = require("express")

const CarsRouter = require('./cars/cars-router')

const server = express()

server.use(express.json())

server.use('./api/cars', CarsRouter)

server.use('*', (req, res) => {
    res.status(400).json({
        message: 'not found'
    })
})

module.exports = server
