const {
  createOrderServices,
  detailOrderServices,
  getAllOrderServices,
  updateOrderServices
} = require('../services/order.js')
const transporter = require('../../utils/transporter.js')
const { historyOrderMessage } = require('../../messageMail')
require('dotenv').config()

const createOrder = async (req, res) => {
  try {
    const payload = req.body
    const { id: user_id } = req.user

    const response = await createOrderServices({ ...payload, user_id })
    res.status(201).json({
      status: 'OK',
      message: 'Create order success',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllOrder = async (req, res) => {
  try {
    const response = await getAllOrderServices()
    res.status(200).json({
      status: 'OK',
      message: 'Get all order success',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllOrderByUser = async (req, res) => {
  try {
    const { id: user_id } = req.user

    const response = await getAllOrderServices(user_id)
    res.status(200).json({
      status: 'OK',
      message: 'Get all order success',
      data: response
    })
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const updateOrder = async (req, res) => {
  try {
    const { order } = req
    const payload = req.body
    const user = req.user
    const response = await updateOrderServices(order, payload)
    const historyOrder = await detailOrderServices(order.id)
    const { id, payment_date } = historyOrder
    const { name: nameCourse, price } = historyOrder.course

    const message = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Konfirmasi Pemesanan',
      html: historyOrderMessage({ nameUser: user.name, id, nameCourse, payment_date, price })
    }

    transporter
      .sendMail(message)
      .then(() => {
        return res
          .status(200)
          .json({
            status: 'OK',
            message: 'Email sent',
            data: response
          })
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: error.message })
      })
  } catch (error) {
    res.status(500).json({
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
