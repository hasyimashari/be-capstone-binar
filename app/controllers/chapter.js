const {
  createChapterService,
  getAllChaptersService,
  updateChapterServices,
  deleteChapterService
} = require('../services/chapter')

const createChapter = async (req, res) => {
  try {
    const chapter = await createChapterService(req.body)

    res.status(201).json({
      status: 'OK',
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
      status: 'OK',
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
    const chapter = req.chapter

    res.status(200).json({
      status: 'OK',
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

const updateChapter = async (req, res) => {
  try {
    const { id } = req.chapter
    const payload = req.body

    const updatedChapter = await updateChapterServices(payload, id)
    res.status(201).json({
      status: 'OK',
      message: 'Update chapter success',
      data: updatedChapter
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const deleteChapter = async (req, res) => {
  try {
    const chapter = req.chapter

    await deleteChapterService(chapter)
    res.status(200).json({
      status: 'OK',
      message: 'Delete chapter success'
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
  getDetailChapter,
  updateChapter,
  deleteChapter
}
