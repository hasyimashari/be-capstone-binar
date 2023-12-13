const { create, findAll, findById, findByCourseId, countChapterByCourseId, updateChapterById, deleteChapterbyId } = require('../repositories/chapter')
const { findByPk: findCourseById, updateCourseRepo } = require('../repositories/course')
const { ApplicationError } = require('../../error')

const createChapterService = async (payload) => {
  try {
    const { course_id } = payload
    const { type: courseType, total_chapter: totalChapter } = await findCourseById(course_id)
    const { count: totalChapterByCourse } = await countChapterByCourseId(course_id)

    const total_chapter = totalChapter + 1
    const index = totalChapterByCourse + 1

    const isLockedContition = courseType === 'Premium' && totalChapterByCourse >= 2

    const chapter = await create({ ...payload, index, is_locked: isLockedContition })
    if (chapter) {
      await updateCourseRepo({ total_chapter }, course_id)
    }

    return chapter
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getAllChaptersService = async (course_id) => {
  try {
    if (course_id) {
      const chapters = await findByCourseId(course_id)
      return chapters
    }

    const chapters = await findAll()
    return chapters
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getDetailChapterServices = async (id) => {
  try {
    const chapters = await findById(id)

    if (!chapters) {
      throw new ApplicationError('Chapter id not found', 404)
    }

    return chapters
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateChapterServices = async (payload, id) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const [_, chapter] = await updateChapterById(payload, id)

    return chapter
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const deleteChapterService = async (id) => {
  try {
    await deleteChapterbyId(id)
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  createChapterService,
  getAllChaptersService,
  getDetailChapterServices,
  updateChapterServices,
  deleteChapterService
}
