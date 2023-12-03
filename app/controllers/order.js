const {
  createOrderServices,
  detailOrderServices,
  getAllOrderServices,
  updateOrderServices
} = require('../services/order.js')

const createOrder = async (req, res) => {
  try {
    const course_id = req.body.course_id
    const user_id = req.user.id
    const order_method = '-'
    const status = 'Belum Bayar'
    const response = await createOrderServices({
      user_id,
      course_id,
      order_method,
      status
    })
    res.status(201).json({ status: 'OK', message: 'Success', data: response })
  } catch (error) {
    res.status(500).json({ status: 'FAIL', message: error.message })
  }
}

const getAllOrder = async (req, res) => {
  try {
    const response = await getAllOrderServices()
    res.status(200).json({ status: 'OK', message: 'Success', data: response })
  } catch (error) {
    res.status(500).json({ status: 'FAIL', message: error.message })
  }
}

const detailOrder = async (req, res) => {
  try {
    const { id } = req.params
    const response = await detailOrderServices(id)
    res.status(200).json({ status: 'OK', message: 'Success', data: response })
  } catch (error) {
    res.status(500).json({ status: 'FAIL', message: error.message })
  }
}

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params
    const response = await updateOrderServices(id)
    res.status(201).json({ status: 'OK', message: 'Success', data: response })
  } catch (error) {
    res.status(500).json({ status: 'FAIL', message: error.message })
  }
}

module.exports = { createOrder, getAllOrder, detailOrder, updateOrder }
