const express = require('express')

const {
  createUserTracker,
  getUserTracker,
  getUserTrackerDetail,
  getTotalData,
  updateUserTracker
} = require('../controllers/tracker.js')
const { isUserTrackerExist } = require('../middleware/tracker.js')
const { isCourseExistInPayload } = require('../middleware/course.js')
const { authorization, onlyAdmin } = require('../middleware/auth.js')

const router = express.Router()

router.post('/trackers', authorization, isCourseExistInPayload, createUserTracker)
router.get('/trackers', authorization, getUserTracker)
router.get('/trackers/:id', authorization, isUserTrackerExist, getUserTrackerDetail)
router.put('/trackers/:id', authorization, isUserTrackerExist, updateUserTracker)
router.get('/counts', authorization, onlyAdmin, getTotalData)

module.exports = router
