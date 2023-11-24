const { create, findByPk, findAll } = require('../repositories/course.js')
const { ApplicationError } = require('../../error')

const createCourseServices = async (argRequest) => {
  try {
    const {
      name,
      code,
      price,
      facilitator,
      level,
      type,
      link_tele,
      video_intro,
      onBoarding,
      description
    } = argRequest
    const course = await create({
      name,
      code,
      price,
      facilitator,
      level,
      type,
      link_tele,
      video_intro,
      onBoarding,
      description
    })
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

module.exports = {
  createCourseServices,
  detailCourseServices,
  getAllCourseServices
}
