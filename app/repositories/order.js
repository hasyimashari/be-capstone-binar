const { Order, Course, User, Category } = require('../models')

const createOrderRepo = (payload) => {
  return Order.create(payload)
}

const findAllOrder = () => {
  return Order.findAll({
    include: [
      {
        model: Course,
        as: 'course',
        attributes: ['name'],
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['category']
          }
        ]
      },
      {
        model: User,
        as: 'user',
        attributes: ['email']
      }
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'user_id', 'course_id']
    }
  })
}

const findByIdOrder = async (id) => {
  return Order.findByPk(id, {
    include: [
      {
        model: Course,
        as: 'course',
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    ]
  })
}

const updateOrderRepo = (payload, id) => {
  return Order.update(payload, {
    where: { id },
    returning: true
  })
}

module.exports = { createOrderRepo, findAllOrder, findByIdOrder, updateOrderRepo }
