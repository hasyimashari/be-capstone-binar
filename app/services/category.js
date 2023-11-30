const { findAllCategory } = require('../repositories/category.js')
const { ApplicationError } = require('../../error')

const getAllCategoryServices = async () => {
  try {
    const categories = await findAllCategory()
    return categories
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = { getAllCategoryServices }
