const { Modul } = require('../models')

const create = (argRequest) => {
  return Modul.create(argRequest)
}

module.exports = { create }
