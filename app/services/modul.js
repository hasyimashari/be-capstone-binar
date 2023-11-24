const { create } = require('../repositories/modul.js')
const { ApplicationError } = require('../../error')
const { findByCodeCourse } = require('../repositories/course.js')

const createModulServices = async (argRequest) => {
  try {
    const { code_course, name, materi, video, chapter } = argRequest
    const course = await findByCodeCourse(code_course)
    const id_course = course.id

    if (code_course !== course.code) {
      throw new ApplicationError('Kode Course tidak sesuai', 400)
    }
    const modul = await create({ course_id: id_course, code_course, name, materi, video, chapter })
    return modul
  } catch (error) {
    console.log(error)
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = { createModulServices }
