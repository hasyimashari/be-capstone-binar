const { create, findAll, findById, findByChapterId, countModuleByChapterId, updateModuleById, deleteModulebyId } = require('../repositories/module.js')
const chapterRepositories = require('../repositories/chapter.js')

const { ApplicationError } = require('../../error/index.js')

const createModuleService = async (payload) => {
  try {
    const { chapter_id, duration } = payload

    const { total_module_duration: totalModuleDuration } = await chapterRepositories.findById(chapter_id)
    const total_module_duration = totalModuleDuration + duration

    const { count: totalModuleByChapter } = await countModuleByChapterId(chapter_id)
    const index = totalModuleByChapter + 1

    const module = await create({ ...payload, index })
    if (module) {
      await chapterRepositories.updateChapterById({ total_module_duration }, chapter_id)
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

const getDetailModuleService = async (id) => {
  try {
    const module = await findById(id)

    return module
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const updateModuleService = async (payload, id) => {
  try {
    const module = await findById(id)
    const { chapter_id, duration } = module
    const { duration: newDuration } = payload

    const { total_module_duration: totalModuleDuration } = await chapterRepositories.findById(chapter_id)
    const total_module_duration = totalModuleDuration - duration + newDuration

    // eslint-disable-next-line no-unused-vars
    const [_, updatedModule] = await updateModuleById(payload, id)
    if (updatedModule) {
      await chapterRepositories.updateChapterById({ total_module_duration }, chapter_id)
    }

    return updatedModule
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const deleteModuleService = async (id) => {
  try {
    const module = await findById(id)
    const { chapter_id, duration } = module

    const { total_module_duration: totalModuleDuration } = await chapterRepositories.findById(chapter_id)
    const total_module_duration = totalModuleDuration - duration

    const deleted = await deleteModulebyId(id)
    if (deleted) {
      await chapterRepositories.updateChapterById({ total_module_duration }, chapter_id)
    }
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  createModuleService,
  getAllModulesService,
  getDetailModuleService,
  updateModuleService,
  deleteModuleService
}
