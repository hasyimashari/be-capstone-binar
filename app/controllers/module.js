const { createModuleService, getAllModulesService, getDetailModuleService, updateModuleService, deleteModuleService } = require('../services/module.js')

const createModule = async (req, res) => {
  try {
    const module = await createModuleService(req.body)

    res.status(201).json({
      status: 'Ok',
      message: 'Create module success',
      data: module
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getAllModule = async (req, res) => {
  try {
    const { chapter_id } = req.query
    const modules = await getAllModulesService(chapter_id)

    res.status(200).json({
      status: 'Ok',
      message: 'Get all modules success',
      data: modules
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const getDetailModule = async (req, res) => {
  try {
    const { id } = req.params
    const module = await getDetailModuleService(id)

    res.status(200).json({
      status: 'Ok',
      message: 'Get detail module success',
      data: module
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const updateModule = async (req, res) => {
  try {
    const { id } = req.params
    const payload = req.body

    const module = await updateModuleService(payload, id)
    res.status(200).json({
      status: 'Ok',
      message: 'Update module success',
      data: module
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

const deleteModule = async (req, res) => {
  try {
    const { id } = req.params
    await deleteModuleService(id)
    res.status(200).json({
      status: 'OK',
      message: 'Delete module success'
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  createModule,
  getAllModule,
  getDetailModule,
  updateModule,
  deleteModule
}
