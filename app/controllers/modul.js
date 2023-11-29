const { createModulServices } = require('../services/modul.js')

const createModul = async (req, res) => {
  try {
    const response = await createModulServices(req.body)
    res.status(201).json({ status: 'success', message: 'Success', data: response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createModul }
