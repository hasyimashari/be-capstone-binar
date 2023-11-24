const { createCourseServices, getAllCourseServices, detailCourseServices } = require('../services/course.js')

const createCourse = async (req, res) => {
  try {
    const response = await createCourseServices(req.body)
    res.status(201).json({ status: 'Ok', message: 'Sucess', data: response })
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
    res.status(200).json({ status: 'OK', messsage: 'Success', data: response })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createCourse, detailCourse, getAllCourse }
