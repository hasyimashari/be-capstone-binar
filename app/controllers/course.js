const { createCourseServices, getAllCourseServices, getAllCourseforAdminServices, detailCourseServices, updateCourseServices, deteleCourseServices } = require('../services/course.js')

const createCourse = async (req, res) => {
  try {
    const response = await createCourseServices(req.body)

    res.status(201).json({
      status: 'Ok',
      message: 'Create course success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllCourse = async (req, res) => {
  try {
    const response = await getAllCourseServices()

    res.status(200).json({
      status: 'Ok',
      message: 'Get all course success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllCourseforAdmin = async (req, res) => {
  try {
    const response = await getAllCourseforAdminServices()

    res.status(200).json({
      status: 'Ok',
      message: 'Get all course success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const detailCourse = async (req, res) => {
  try {
    const id = req.params.id
    const response = await detailCourseServices(id)
    res.status(200).json({
      status: 'OK',
      message: 'Get detail course success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const updateCourse = async (req, res) => {
  try {
    const id = req.params.id
    // eslint-disable-next-line no-unused-vars
    const [_, response] = await updateCourseServices(req.body, id)

    res.status(200).json({
      status: 'Ok',
      message: 'Update course success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id
    await deteleCourseServices(id)
    res.status(200).json({
      status: 'OK',
      message: 'Detele course success'
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = { createCourse, detailCourse, getAllCourse, getAllCourseforAdmin, updateCourse, deleteCourse }
