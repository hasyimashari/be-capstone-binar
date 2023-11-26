const { createAccessToken } = require('../services/auth.js')
const {
  registeService,
  loginUserSevices,
  loginAdminSevices,
  updateUserServices,
  resetPasswordServices,
  detailUserServices
} = require('../services/user.js')
require('dotenv').config()

const register = async (req, res) => {
  try {
    const response = await registeService(req.body)
    const { id, name, email, role } = response
    const accessToken = createAccessToken({ id, name, email, role })
    res.status(201).json({
      status: 'OK',
      message: 'Success',
      data: {
        accessToken
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const response = await loginUserSevices(req.body)
    const { id, name, email, role } = response
    const accessToken = createAccessToken({ id, name, email, role })
    res.status(200).json({
      status: 'OK',
      message: 'Success Login',
      data: {
        accessToken
      }
    })
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message })
  }
}

const loginAdmin = async (req, res) => {
  try {
    const response = await loginAdminSevices(req.body)
    const { id, name, email, role } = response
    const accessToken = createAccessToken({ id, name, email, role })
    res.status(200).json({
      status: 'OK',
      message: 'Success Login',
      data: {
        accessToken
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const currentUser = async (req, res) => {
  try {
    const user = req.user
    const response = await detailUserServices(user.id)
    res.status(200).json({ status: 'OK', message: 'Success', data: response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.user.id
    const photo = req.photo
    // eslint-disable-next-line no-unused-vars
    const [_, response] = await updateUserServices({ ...req.body, photo }, id)
    res
      .status(201)
      .json({ status: 'OK', message: 'Success updated', data: response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const resetPassword = async (req, res) => {
  try {
    const id = req.user.id
    // eslint-disable-next-line no-unused-vars
    const [_, response] = await resetPasswordServices(req.body, id)
    res.status(201).json({ status: 'OK', message: 'Sucess', data: response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  register,
  loginUser,
  loginAdmin,
  currentUser,
  updateUser,
  resetPassword
}
