const { Course, Modul } = require('../models')

const create = (argRequest) => {
  return Course.create(argRequest)
}

const findAll = () => {
  return Course.findAll()
}

const findByPk = (id) => {
  return Course.findByPk(id, {
    include: [
      {
        model: Modul
      }
    ]
  })
}

const findByCodeCourse = (code) => {
  return Course.findOne({
    where: { code }
  })
}

module.exports = { create, findAll, findByPk, findByCodeCourse }
