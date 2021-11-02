const express = require('express');
const db = require('../../data/db-config');
const knex = require('knex');

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    db('cars')
        .then(car => {
            res.status(200).json(car)
        })
        .catch(next)
})

router.get('/:id', checkCarId, (req, res, next) => {
    const { id } = req.params
    db('cars').where({ id }).first()
        .then(car => {
            res.status(200).json(car)
        })
        .catch(next)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    const carData = req.body
    db('cars').insert(carData)
        .then(ids => {
            db('cars').where({ id: ids[0] })
        })
        .then(newCar => {
            res.status(201).json(newCar)
        })
        .catch(next)
})

module.exports = router