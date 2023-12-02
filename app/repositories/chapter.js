const { Chapter, Module } = require('../models')

const create = (payload) => {
  return Chapter.create(payload)
}

const findAll = () => {
  return Chapter.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
}

const findById = (id) => {
  return Chapter.findByPk(id, {
    include: [
      {
        model: Module,
        as: 'modules',
        attributes: ['id', 'index', 'name', 'video', 'duration']
      }
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
}

const findByCourseId = (course_id) => {
  return Chapter.findAll({
    where: { course_id },
    attributes: {
      exclude: ['course_id', 'createdAt', 'updatedAt']
    }
  })
}

const countChapterByCourseId = (course_id) => {
  return Chapter.findAndCountAll({
    where: { course_id }
  })
}

const updateChapter = (payload, id) => {
  return Chapter.update(payload, {
    where: { id },
    returning: true
  })
}

module.exports = {
  create,
  findAll,
  findById,
  findByCourseId,
  updateChapter,
  countChapterByCourseId
}
