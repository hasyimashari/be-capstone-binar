const { Course } = require('../models')

const create = (argRequest) => {
  return Course.create(argRequest)
}

const findAll = () => {
  return Course.findAll()
}

const findByPk = (id) => {
  return Course.findByPk(id)
}

const findByCodeCourse = (code) => {
  return Course.findOne({
    where: { code }
  })
}

const updateCourseRepo = (argRequest, id) => {
  return Course.update(argRequest, {
    where: { id }, returning: true
  })
}

const deleteCourseRepo = (id) => {
  return Course.destroy({
    where: { id }
  })
}

module.exports = { create, findAll, findByPk, findByCodeCourse, updateCourseRepo, deleteCourseRepo }
