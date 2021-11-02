// DO YOUR MAGIC
const router = require('express').Router()

const Cars = require('./cars-model')

router.get('/', (req, res, next) => {
    Cars.getAll(req.query)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Cars.getById(id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Cars.create(req.body)
        .then(car => {
            res.status(201).json(car)
        })
})

module.exports = router