const { createCategoryServices } = require('../services/category.js')
const { createCourseServices, getAllCourseServices, detailCourseServices, updateCourseServices, deteleCourseServices } = require('../services/course.js')

const createCourse = async (req, res) => {
  try {
    const response = await createCourseServices(req.body)
    const category = await createCategoryServices(req.body)
    res.status(201).json({ status: 'Ok', message: 'Sucess', data: { data: response, category } })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllCourse = async (req, res) => {
  try {
    const response = await getAllCourseServices()
    res.status(201).json({ status: 'Ok', message: 'Sucess', data: response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const detailCourse = async (req, res) => {
  try {
    const id = req.params.id
    const response = await detailCourseServices(id)
    res.status(200).json({ status: 'OK', message: 'Success', data: response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCourse = async (req, res) => {
  try {
    const id = req.params.id
    // eslint-disable-next-line no-unused-vars
    const [_, response] = await updateCourseServices(req.body, id)
    res.status(200).json({ status: 'Ok', message: 'Success', data: response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id
    await deteleCourseServices(id)
    res.status(200).json({ status: 'OK', message: 'Course deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createCourse, detailCourse, getAllCourse, updateCourse, deleteCourse }
