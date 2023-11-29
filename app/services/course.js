const { create, findByPk, findAll, updateCourseRepo, deleteCourseRepo } = require('../repositories/course.js')
const { ApplicationError } = require('../../error')

const createCourseServices = async (argRequest) => {
  try {
    const course = await create(argRequest)
    return course
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getAllCourseServices = async () => {
  try {
    const course = await findAll()
    return course
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const detailCourseServices = async (id) => {
  try {
    const course = await findByPk(id)
    return course
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const updateCourseServices = async (argRequest, id) => {
  try {
    const course = await updateCourseRepo(argRequest, id)
    return course
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const deteleCourseServices = async (id) => {
  try {
    const course = await deleteCourseRepo(id)
    return course
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  createCourseServices,
  detailCourseServices,
  getAllCourseServices,
  updateCourseServices,
  deteleCourseServices
}
