const express = require('express')
const { createCourse, detailCourse, getAllCourse, getAllCourseforAdmin, updateCourse, deleteCourse } = require('../controllers/course.js')
// const { authorization, onlyAdmin } = require('../middleware/auth.js')

const router = express.Router()

router.post('/admin/courses', createCourse)
router.get('/admin/courses', getAllCourseforAdmin)
router.get('/courses', getAllCourse)
router.get('/courses/:id', detailCourse)
router.put('/admin/courses/:id', updateCourse)
router.delete('/admin/courses/:id', deleteCourse)

module.exports = router
