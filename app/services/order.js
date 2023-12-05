const {
  createOrderRepo,
  findAllOrder,
  findAllOrderByUserId,
  findByIdOrder,
  updateOrderRepo
} = require('../repositories/order.js')

const { ApplicationError } = require('../../error')

const createOrderServices = async (payload) => {
  try {
    const order = await createOrderRepo({ ...payload })
    return order
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getAllOrderServices = async (user_id) => {
  try {
    if (user_id) {
      const orders = await findAllOrderByUserId(user_id)
      return orders
    }

    const orders = await findAllOrder()
    return orders
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const detailOrderServices = async (id) => {
  try {
    const order = await findByIdOrder(id)
    if (!order) {
      throw new ApplicationError('Order id not found', 404)
    }

    return order
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateOrderServices = async (order, payload) => {
  try {
    const { id, payment_date: paymentDate } = order

    const status = 'SUDAH BAYAR'
    const payment_date = paymentDate || new Date()

    // eslint-disable-next-line no-unused-vars
    const [_, updatedOrder] = await updateOrderRepo({ status, payment_date, ...payload }, id)
    return updatedOrder
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  createOrderServices,
  getAllOrderServices,
  detailOrderServices,
  updateOrderServices
}
