const { create, findAll, findById, findByChapterId, countModuleByChapterId } = require('../repositories/module.js')
const chapterRepositories = require('../repositories/chapter.js')

const { ApplicationError } = require('../../error/index.js')

const createModuleService = async (payload) => {
  try {
    const { chapter_id, duration } = payload

    const { total_module_duration: chapterDuration } = await chapterRepositories.findById(chapter_id)
    const total_module_duration = chapterDuration + duration

    const { count: totalModuleByChapter } = await countModuleByChapterId(chapter_id)
    const index = totalModuleByChapter + 1

    const module = await create({ ...payload, index })
    if (module) {
      await chapterRepositories.updateChapter({ total_module_duration }, chapter_id)
    }

    return module
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getAllModulesService = async (chapter_id) => {
  try {
    if (chapter_id) {
      const modules = await findByChapterId(chapter_id)
      return modules
    }

    const modules = await findAll()
    return modules
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getDetailModuleServices = async (id) => {
  try {
    const module = await findById(id)

    return module
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  createModuleService,
  getAllModulesService,
  getDetailModuleServices
}
