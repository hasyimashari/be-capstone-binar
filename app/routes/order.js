const express = require('express')
const { createOrder, getAllOrder, detailOrder } = require('../controllers/order.js')
const { authorization } = require('../middleware/auth.js')

const router = express.Router()

router.post('/orders', authorization, createOrder)
router.get('/orders', getAllOrder)
router.get('/orders/:id', detailOrder)

module.exports = router
