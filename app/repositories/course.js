const { Course, Category, Chapter } = require('../models')

const create = (argRequest) => {
  return Course.create(argRequest)
}

const findAll = (order) => {
  return Course.findAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['category', 'image']
      }
    ],
    attributes: {
      exclude: [
        'code',
        'category_id',
        'description',
        'telegram_group',
        'on_boarding',
        'introduction_video',
        'createdAt',
        'updatedAt'
      ]
    },
    order: [
      ['createdAt', order || 'ASC']
    ]
  })
}

const findAllforAdmin = () => {
  return Course.findAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['category']
      }
    ],
    attributes: {
      exclude: [
        'category_id',
        'description',
        'telegram_group',
        'on_boarding',
        'introduction_video',
        'createdAt',
        'updatedAt'
      ]
    }
  })
}

const findByPk = (id) => {
  return Course.findByPk(id, {
    include:
    [
      {
        model: Category,
        as: 'category',
        attributes: ['category', 'image']
      }, {
        model: Chapter,
        as: 'chapters',
        attributes: ['id', 'index', 'name', 'is_locked']
      }],
    attributes:
      {
        exclude: [
          'code',
          'category_id',
          'createdAt',
          'updatedAt']
      }
  })
}

const updateCourseRepo = (argRequest, id) => {
  return Course.update(argRequest, {
    where: { id },
    returning: true
  })
}

const deleteCourseRepo = (id) => {
  return Course.destroy({
    where: { id }
  })
}

module.exports = {
  create,
  findAll,
  findAllforAdmin,
  findByPk,
  updateCourseRepo,
  deleteCourseRepo
}
