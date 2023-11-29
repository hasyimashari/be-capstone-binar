const { create } = require('../repositories/modul.js')
const { ApplicationError } = require('../../error')
const { findByCodeCourse } = require('../repositories/course.js')

const createModulServices = async (argRequest) => {
  try {
    const { course_code } = argRequest
    console.log(argRequest)
    const course = await findByCodeCourse(course_code)
    const course_id = course.id

    if (course_code !== course.code) {
      throw new ApplicationError('Kode Course tidak sesuai', 400)
    }
    const modul = await create({ course_id, ...argRequest })
    return modul
  } catch (error) {
    console.log(error)
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = { createModulServices }
