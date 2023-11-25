const express = require('express')
const { createCourse, detailCourse, getAllCourse } = require('../controllers/course.js')
// const { authorization, onlyAdmin } = require('../middleware/auth.js')

const router = express.Router()

router.post('/courses', createCourse)
router.get('/courses', getAllCourse)
router.get('/courses/:id', detailCourse)

module.exports = router
