const {
  createOrderServices,
  detailOrderServices,
  getAllOrderServices,
  updateOrderServices
} = require('../services/order.js')

const createOrder = async (req, res) => {
  try {
    const payload = req.body
    const { id: user_id } = req.user

    const response = await createOrderServices(user_id, payload)
    res.status(201).json({
      status: 'OK',
      message: 'Create order success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllOrder = async (req, res) => {
  try {
    const filter = req.query
    const response = await getAllOrderServices(filter)

    res.status(200).json({
      status: 'OK',
      message: 'Get all order success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllOrderByUser = async (req, res) => {
  try {
    const { id: user_id } = req.user

    const response = await getAllOrderServices({}, user_id)
    res.status(200).json({
      status: 'OK',
      message: 'Get all order success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const detailOrder = async (req, res) => {
  try {
    const { id } = req.params
    const response = await detailOrderServices(id)

    res.status(200).json({
      status: 'OK',
      message: 'Get detail order success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const updateOrder = async (req, res) => {
  try {
    const { order } = req
    const payload = req.body

    const response = await updateOrderServices(order, payload)
    res.status(201).json({
      status: 'OK',
      message: 'Update order success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  createOrder,
  getAllOrder,
  getAllOrderByUser,
  detailOrder,
  updateOrder
}
