const express = require('express')

const {
  createCourse,
  detailCourse,
  getAllCourse,
  getAllCourseAdmin,
  updateCourse, deleteCourse
} = require('../controllers/course.js')
const { isCategoryExist } = require('../middleware/category.js')
const { isCourseExist } = require('../middleware/course.js')
// const { authorization, onlyAdmin } = require('../middleware/auth.js')

const router = express.Router()

router.get('/courses', getAllCourse)
router.get('/courses/:id', isCourseExist, detailCourse)

router.post('/admin/courses', isCategoryExist, createCourse)
router.get('/admin/courses', getAllCourseAdmin)
router.put('/admin/courses/:id', isCourseExist, isCategoryExist, updateCourse)
router.delete('/admin/courses/:id', isCourseExist, deleteCourse)

module.exports = router
