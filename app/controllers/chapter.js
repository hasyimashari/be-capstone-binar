const { createChapterService, getAllChaptersService, getDetailChapterServices } = require('../services/chapter')

const createChapter = async (req, res) => {
  try {
    const chapter = await createChapterService(req.body)

    res.status(201).json({
      status: 'Ok',
      message: 'Create chapter success',
      data: chapter
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllChapter = async (req, res) => {
  try {
    const { course_id } = req.query
    const chapters = await getAllChaptersService(course_id)

    res.status(200).json({
      status: 'Ok',
      message: 'Get all chapter success',
      data: chapters
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getDetailChapter = async (req, res) => {
  try {
    const { id } = req.params
    const chapter = await getDetailChapterServices(id)

    res.status(200).json({
      status: 'Ok',
      message: 'Get detail chapter success',
      data: chapter
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  createChapter,
  getAllChapter,
  getDetailChapter
}
