const { createAccessToken } = require('../services/auth.js')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const crypto = require('crypto')
const {
  registeService,
  loginUserSevices,
  loginAdminSevices,
  updateUserServices,
  updatePasswordServices,
  detailUserServices,
  updateTokenPasswordServices,
  resetPasswordServices
} = require('../services/user.js')
require('dotenv').config()

const register = async (req, res) => {
  try {
    const response = await registeService(req.body)
    const { id, name, email, role } = response
    const accessToken = createAccessToken({ id, name, email, role })
    res.status(201).json({ status: 'OK', message: 'Success', data: { accessToken } })
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

const updatePassword = async (req, res) => {
  try {
    const id = req.user.id
    // eslint-disable-next-line no-unused-vars
    const [_, response] = await updatePasswordServices(req.body, id)
    res.status(201).json({ status: 'OK', message: 'Sucess', data: response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const sendLinkPassword = async (req, res) => {
  const email = req.body.email
  const tokenResetPassword = crypto.randomBytes(10).toString('hex')

  await updateTokenPasswordServices({ tokenResetPassword }, email)

  const config = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls: { rejectUnauthorized: false }
  }

  const transporter = nodemailer.createTransport(config)

  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Dev Academy',
      link: 'https://mailgen.js/'
    }
  })

  const response = {
    body: {
      intro: 'Reset Password',
      action: {
        instructions: 'Clik button to page reset password',
        button: {
          color: '#22BC66',
          text: 'Click this to reset password',
          link: `http://localhost:3004/api/reset/password/${tokenResetPassword}`
        }
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help."
    }
  }

  const mail = MailGenerator.generate(response)
  const message = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Reset Password',
    html: mail
  }

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ status: 'OK', message: 'Email sent successfully' })
    })
    .catch((error) => {
      return res.status(500).json({ status: 'Faild', message: error.message })
    })
}

const resetPassword = async (req, res) => {
  try {
    const tokenResetPassword = req.params.tokenResetPassword
    await resetPasswordServices(req.body, tokenResetPassword)
    res.status(200).json({ status: 'OK', message: 'Success' })
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
  updatePassword,
  sendLinkPassword,
  resetPassword
}
