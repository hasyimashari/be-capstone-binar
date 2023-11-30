const { create, findByPk, findAll, findAllforAdmin, updateCourseRepo, deleteCourseRepo } = require('../repositories/course.js')
const { findByCourseId, countChapterByCourseId } = require('../repositories/chapter.js')

const { ApplicationError } = require('../../error')

const createCourseServices = async (argRequest) => {
  try {
    const course = await create(argRequest)
    return course
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getTotalChapter = async (id) => {
  const { count } = await countChapterByCourseId(id)

  return count
}

const getTotalDuration = async (id) => {
  const chapters = await findByCourseId(id)

  const totalDuration = chapters.reduce((sum, chapter) => {
    return sum + chapter.total_module_duration
  }, 0)

  return totalDuration
}

const getAllCourseServices = async () => {
  try {
    const courses = await findAll()

    const modifiedData = await Promise.all(
      courses.map(async (course) => {
        return {
          ...course.dataValues,
          total_chapter: await getTotalChapter(course.id),
          total_duration: await getTotalDuration(course.id)
        }
      }))

    return modifiedData
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
  getAllCourseforAdminServices,
  updateCourseServices,
  deteleCourseServices
}
