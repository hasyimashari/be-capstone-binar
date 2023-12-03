const { create, findAll, findById, findByCourseId, countChapterByCourseId, updateChapterById, deleteChapterbyId } = require('../repositories/chapter')
const { ApplicationError } = require('../../error')
// add prem logic
const createChapterService = async (payload) => {
  try {
    const { course_id } = payload
    const { count: totalChapterByCourse } = await countChapterByCourseId(course_id)

    const index = totalChapterByCourse + 1
    const chapter = await create({ ...payload, index })

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

    return chapters
  } catch (error) {
    throw new ApplicationError(error.message, 500)
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
