const express = require('express')
const { authorization } = require('../middleware/auth.js')
const { createOrder, getAllOrder, detailOrder, updateOrder } = require('../controllers/order.js')

const router = express.Router()

router.post('/orders', authorization, createOrder)
router.get('/orders', getAllOrder)
router.get('/orders/:id', detailOrder)
router.put('/orders/:id', updateOrder)

module.exports = router
