const { Category } = require('../models')

const create = (argRequest) => {
  return Category.create(argRequest)
}

const findIdCategory = (id) => {
  return Category.findByPk(id)
}

module.exports = { create, findIdCategory }
