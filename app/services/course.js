/* eslint-disable quote-props */
const { create, findByPk, findAll, findAllforAdmin, updateCourseRepo, deleteCourseRepo } = require('../repositories/course.js')
const { findByCourseId: findChapterByCourseId, countChapterByCourseId } = require('../repositories/chapter.js')

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
  const chapters = await findChapterByCourseId(id)

  const totalDuration = chapters.reduce((sum, chapter) => {
    return sum + chapter.total_module_duration
  }, 0)

  return totalDuration
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

    const additionalData = courses.map(async (course) => {
      const [totalChapter, totalDuration] = await Promise.all([
        getTotalChapter(course.id),
        getTotalDuration(course.id)
      ])

      return {
        ...course.dataValues,
        total_chapter: totalChapter,
        total_duration: totalDuration
      }
    })

    const conditions = (i) => {
      const categoryCondition = !restFilter.category || restFilter.category.includes(i.category.category)
      const levelCondition = !restFilter.level || restFilter.level.includes(i.level)

      return categoryCondition && levelCondition
    }

    const modifiedCourses = await Promise.all(additionalData)
    const modifiedCourseFiltered = modifiedCourses.filter(conditions)

    return modifiedCourseFiltered
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
