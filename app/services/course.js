/* eslint-disable quote-props */
const { create, findByPk, findAll, findAllforAdmin, updateCourseRepo, deleteCourseRepo } = require('../repositories/course.js')

const { ApplicationError } = require('../../error')

const createCourseServices = async (argRequest) => {
  try {
    const course = await create(argRequest)
    return course
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getAllCourseServices = async (filter) => {
  try {
    const orderConditions = {
      'Paling Baru': 'ASC',
      'Promo': 'DESC'
    }

    const { filter: orderFilter, ...restFilter } = filter
    const order = orderConditions[orderFilter]

    const courses = await findAll(order)

    const conditions = (i) => {
      const nameCondition = !restFilter.name || i.name.includes(restFilter.name)
      const categoryCondition = !restFilter.category || restFilter.category.includes(i.category.category)
      const typeCondition = !restFilter.type || restFilter.type.includes(i.type)
      const levelCondition = !restFilter.level || restFilter.level.includes(i.level)

      return nameCondition && categoryCondition && typeCondition && levelCondition
    }

    const courseFiltered = courses.filter(conditions)

    return courseFiltered
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getAllCourseforAdminServices = async () => {
  try {
    const courses = await findAllforAdmin()

    return courses
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const detailCourseServices = async (id) => {
  try {
    const course = await findByPk(id)

    if (!course) {
      throw new ApplicationError('Course id not found', 404)
    }

    return course
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
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
    await deleteCourseRepo(id)
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  createCourseServices,
  detailCourseServices,
  getAllCourseServices,
  getAllCourseforAdminServices,
  updateCourseServices,
  deteleCourseServices
}
