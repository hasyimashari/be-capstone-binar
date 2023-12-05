const express = require('express')

const {
  createChapter,
  getAllChapter,
  getDetailChapter,
  updateChapter,
  deleteChapter
} = require('../controllers/chapter')
const { isCourseExistInPayload } = require('../middleware/course')
const { isChapterExist } = require('../middleware/chapter')

const router = express.Router()

router.post('/admin/chapters', isCourseExistInPayload, createChapter)
router.get('/admin/chapters', getAllChapter)
router.get('/chapters/:id', isChapterExist, getDetailChapter)
router.put('/admin/chapters/:id', isChapterExist, isCourseExistInPayload, updateChapter)
router.delete('/admin/chapters/:id', isChapterExist, deleteChapter)

module.exports = router
