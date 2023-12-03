const { Order, Course, User, Category } = require('../models')

const createOrderRepo = (argRequest) => {
  return Order.create(argRequest)
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

module.exports = { createOrderRepo, findAllOrder, findByIdOrder }
