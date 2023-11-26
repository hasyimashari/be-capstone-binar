const express = require('express')
const { register, loginAdmin, loginUser } = require('../controllers/user.js')

const router = express.Router()

router.post('/register', register)
router.post('/login', loginUser)
router.post('/admin/login', loginAdmin)

module.exports = router
