const { createOrderRepo, findAllOrder, findByIdOrder } = require('../repositories/order.js')

const { ApplicationError } = require('../../error')

const createOrderServices = async (payload) => {
  try {
    const order = await createOrderRepo({ ...payload })
    return order
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getAllOrderServices = async () => {
  try {
    const order = await findAllOrder()
    return order
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const detailOrderServices = async (id) => {
  try {
    const order = await findByIdOrder(id)
    return order
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = { createOrderServices, getAllOrderServices, detailOrderServices }
