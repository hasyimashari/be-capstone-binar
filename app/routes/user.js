const express = require('express')
const { authorization } = require('../middleware/auth.js')
const { resetPassword, updateUser } = require('../controllers/user.js')
const { uploadStorage, uploadToCloudinary } = require('../middleware/uploadImage.js')

const router = express.Router()

router.put('/users', authorization, uploadStorage, uploadToCloudinary, updateUser)
router.put('/password', authorization, resetPassword)

module.exports = router
