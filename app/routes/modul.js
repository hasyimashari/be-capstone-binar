const express = require('express')
const { createModul } = require('../controllers/modul')
const { authorization, onlyAdmin } = require('../middleware/auth.js')

const router = express.Router()

router.post('/moduls', authorization, onlyAdmin, createModul)

module.exports = router
