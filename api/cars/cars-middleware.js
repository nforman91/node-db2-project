const db = require('../../data/db-config')
const Cars = require('../cars/cars-model')
// const yup = require('yup')

// const carSchema = yup.object().shape({
//   vin: yup
//     .required('vin is missing'),
//   make: yup
//     .required('make is missing'),
//   model: yup
//     .required('model is missing'),
//   mileage: yup
//     .required('mileage is missing')
// })

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
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

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body
  if (
    vin &&
    make &&
    model &&
    mileage
  ) {
    next()
  } else {
    res.status(400).json({ message: "<field name> is missing" })
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  var vinValidator = require('vin-validator');
  var isValidVin = vinValidator.validate('11111111111111111');
  { message: "vin <vin number> is invalid" }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
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
