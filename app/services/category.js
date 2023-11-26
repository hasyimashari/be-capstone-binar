const { create } = require('../repositories/category.js')
const { ApplicationError } = require('../../error')

const createCategoryServices = async (argRequest) => {
  try {
    const { category } = argRequest
    const categories = await create({ category })
    return categories
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = { createCategoryServices }
