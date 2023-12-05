const { getDetailModuleService } = require('../services/module')

const isModuleExist = async (req, res, next) => {
  try {
    const { id } = req.params
    const chapter = await getDetailModuleService(id)

    req.chapter = chapter
    next()
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  isModuleExist
}
