const { Module } = require('../models')

const create = (payload) => {
  return Module.create(payload)
}

const findAll = () => {
  return Module.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })
}

const findById = (id) => {
  return Module.findByPk(id)
}

const findByChapterId = (chapter_id) => {
  return Module.findAll({
    where: { chapter_id },
    attributes: {
      exclude: ['chapter_id', 'createdAt', 'updatedAt']
    }
  })
}

const countModuleByChapterId = (chapter_id) => {
  return Module.findAndCountAll({
    where: { chapter_id }
  })
}

module.exports = {
  create,
  findAll,
  findById,
  findByChapterId,
  countModuleByChapterId
}
