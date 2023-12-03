const express = require('express')
const { createChapter, getAllChapter, getDetailChapter, updateChapter, deleteChapter } = require('../controllers/chapter')

const router = express.Router()

router.post('/admin/chapters', createChapter)
router.get('/admin/chapters', getAllChapter)
router.get('/chapters/:id', getDetailChapter)
router.put('/admin/chapters/:id', updateChapter)
router.delete('/admin/chapters/:id', deleteChapter)

module.exports = router
