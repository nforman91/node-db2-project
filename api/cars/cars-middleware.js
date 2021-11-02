const db = require('../../data/db-config')
const Cars = require('../cars/cars-model')
const yup = require('yup')
const vin = require('vin-validator')

const carSchema = yup.object().shape({
  vin: yup
    .string()
    .required('vin is missing'),
  make: yup
    .string()
    .required('make is missing'),
  model: yup
    .string()
    .required('model is missing'),
  mileage: yup
    .number()
    .required('mileage is missing')
})

const checkCarId = (req, res, next) => {
  const { id } = req.params
  Cars.getById(id)
    .then(possibleCar => {
      if (possibleCar) {
        req.car = possibleCar
        next()
      } else {
        res.status(404).json({ message: `car with id ${id} is not found` })
      }
    })
}

const checkCarPayload = async (req, res, next) => {
  try {
    const validated = await carSchema.validate(
      req.body,
      { strict: true, stripUnknown: true }
    )
    req.body = validated
    next()
  } catch (err) {
    next({ status: 400, message: err.message })
  }
}

const checkVinNumberValid = (req, res, next) => {
  if (vin.validate(req.body.vin)) {
    next()
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body
  try {
    const existing = await db('cars')
      .where('vin', vin)
      .first()

    if (existing) {
      next({ status: 400, message: `vin ${vin} already exists` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
