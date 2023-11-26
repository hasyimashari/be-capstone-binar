const express = require('express')
const { createCourse, detailCourse, getAllCourse, updateCourse, deleteCourse } = require('../controllers/course.js')
// const { authorization, onlyAdmin } = require('../middleware/auth.js')

const router = express.Router()

router.post('/courses', createCourse)
router.get('/courses', getAllCourse)
router.get('/courses/:id', detailCourse)
router.put('/courses/:id', updateCourse)
router.delete('/courses/:id', deleteCourse)

module.exports = router
