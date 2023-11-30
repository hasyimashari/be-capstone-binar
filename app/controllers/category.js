const { getAllCategoryServices } = require('../services/category')

const getAllCcategories = async (req, res) => {
  try {
    const response = await getAllCategoryServices()
    res.status(201).json({
      status: 'Ok',
      message: 'Get categories data success',
      data: response
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'FAIL',
      message: error.message
    })
  }
}

module.exports = {
  getAllCcategories
}
