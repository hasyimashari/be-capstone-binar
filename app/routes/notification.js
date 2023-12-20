const express = require('express')
const { getAllNotifByUser, updateNotif } = require('../controllers/notification.js')
const { authorization } = require('../middleware/auth.js')

const router = express.Router()

router.get('/notifications', authorization, getAllNotifByUser)
router.put('/notifications/:id', updateNotif)

module.exports = router
