const express = require('express')
const { authorization } = require('../middleware/auth.js')
// eslint-disable-next-line no-unused-vars
const {
  createOrder,
  getAllOrder,
  getAllOrderByUser,
  detailOrder,
  updateOrder
} = require('../controllers/order.js')
const { isOrderExist } = require('../middleware/order.js')

const router = express.Router()

router.post('/orders', authorization, createOrder)
router.get('/orders', authorization, getAllOrderByUser)
router.get('/admin/orders', getAllOrder)
router.get('/admin/orders/:id', isOrderExist, detailOrder)
router.put('/orders/:id', isOrderExist, updateOrder)

module.exports = router
