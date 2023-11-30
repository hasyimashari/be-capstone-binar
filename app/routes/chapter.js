const express = require('express')
const { createChapter, getAllChapter, getDetailChapter } = require('../controllers/chapter')

const router = express.Router()

router.post('/admin/chapters', createChapter)
router.get('/admin/chapters', getAllChapter)
router.get('/chapters/:id', getDetailChapter)

module.exports = router
