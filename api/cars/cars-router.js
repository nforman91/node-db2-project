const express = require('express')
const knex = require('knex')

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')

const router = express.Router()
const Cars = require('./../cars/cars-model')

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(next)
})

router.get('/:id', checkCarId, (req, res, next) => {
    const { id } = req.params
    Cars.getById(id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(next)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    const carData = req.body
    Cars.create(carData)
        .then(newCar => {
            res.status(201).json(newCar)
        })
        .catch(next)
})

module.exports = router
