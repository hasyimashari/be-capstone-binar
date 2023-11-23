const express = require('express')
const { register, loginAdmin, loginUser } = require('../controllers/user.js')

const router = express.Router()

router.post('/registrasi', register)
router.post('/login', loginUser)
router.post('/login/admin', loginAdmin)

module.exports = router
