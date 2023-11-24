const express = require('express')
const { createCourse, detailCourse, getAllCourse } = require('../controllers/course.js')
const { authorization, onlyAdmin } = require('../middleware/auth.js')

const router = express.Router()

router.post('/courses', authorization, onlyAdmin, createCourse)
router.get('/courses', authorization, getAllCourse)
router.get('/courses/:id', authorization, detailCourse)

module.exports = router
