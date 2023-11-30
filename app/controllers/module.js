const { createModuleService, getAllModulesService, getDetailModuleServices } = require('../services/module.js')

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
      message: 'Get all module success',
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
    const module = await getDetailModuleServices(id)

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

module.exports = {
  createModule,
  getAllModule,
  getDetailModule
}
