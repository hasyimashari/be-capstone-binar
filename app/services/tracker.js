const { create, findByUserId, findByUserAndCourseId, update } = require('../repositories/tracker')
const { findByCourseId } = require('../repositories/chapter')
const { countModuleByChapterId } = require('../repositories/module')
const { countCourse } = require('../repositories/course')
const { countUser } = require('../repositories/user')

const { ApplicationError } = require('../../error')

const getTotalModulePerChapter = async (chapter_id) => {
  const { count } = await countModuleByChapterId(chapter_id)
  return count
}

const getProgress = async (course_id, total_modules_viewed) => {
  try {
    const chapters = await findByCourseId(course_id)

    const totalModuleRaw = await Promise.all(chapters.map(chapter => getTotalModulePerChapter(chapter.id)))
    const totalModule = totalModuleRaw.reduce((sum, count) => sum + count)

    console.log(total_modules_viewed, totalModule)
    const progress = Math.floor((total_modules_viewed / totalModule) * 100)
    console.log(progress)
    return progress
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const createUserTrackerService = async (user_id, payload) => {
  try {
    const { course_id } = payload
    const isCourseInTrackers = await findByUserAndCourseId({ user_id, course_id })

    if (isCourseInTrackers) {
      throw new ApplicationError('Course is in progress', 400)
    }

    const userTracker = await create({ user_id, ...payload })

    return userTracker
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const getTrackerByUserServices = async (user_id) => {
  try {
    const userTrakcer = await findByUserId(user_id)

    return userTrakcer
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const getUserTrackerServices = async (user_id, course_id) => {
  try {
    const userTracker = await findByUserAndCourseId({ user_id, course_id })

    if (!userTracker) {
      throw new ApplicationError('User Tracker not found', 404)
    }

    return userTracker
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateUserTrackerServices = async (payload, tracker) => {
  try {
    const { id, last_opened_chapter, last_opened_module, total_modules_viewed: totalModulesViewed } = tracker
    const { course_id, last_opened_chapter: updatedLastOpenedChapter, last_opened_module: updatedLastOpenedModule } = payload

    const total_modules_viewed = totalModulesViewed + 1
    const progressCondition = () => {
      const chapterProgressConditon = updatedLastOpenedChapter > last_opened_chapter
      const moduleProressCondition = updatedLastOpenedModule > last_opened_module

      return chapterProgressConditon || moduleProressCondition
    }

    const onProgress = progressCondition()
    if (!onProgress) {
      throw new ApplicationError('Can\'t update the progress', 400)
    }

    const progress_course = await getProgress(course_id, total_modules_viewed)

    // eslint-disable-next-line no-unused-vars
    const [_, updatedUserTracker] = await update({ ...payload, total_modules_viewed, progress_course }, id)

    return updatedUserTracker
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const countTotalDataServices = async () => {
  try {
    const [total_user, total_course, total_premium_course] = await Promise.all([
      countUser(),
      countCourse(),
      countCourse({ type: 'Premium' })
    ])

    const totalData = {
      total_user: total_user.count,
      total_course: total_course.count,
      total_premium_course: total_premium_course.count
    }

    return totalData
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  createUserTrackerService,
  getTrackerByUserServices,
  getUserTrackerServices,
  countTotalDataServices,
  updateUserTrackerServices
}
