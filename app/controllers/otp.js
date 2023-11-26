const { confimOtpServices, createOtpServices, updateOtpServices, findOtpCode } = require('../services/otp.js')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const { encryptedKode } = require('../services/auth.js')
require('dotenv').config()

const sendOtp = async (req, res) => {
  try {
    const otp = Math.floor(Math.random() * 900000) + 100000
    const emailPenerima = req.user.email
    const userId = req.user.id
    const name = req.user.name
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
        name,
        intro: 'OTP Verification',
        action: {
          button: {
            color: '#22BC66',
            text: otp
          }
        },
        outro:
          'Kode Verifikasi hanya berlaku hanya dalam waktu 5 menit'
      }
    }

    const mail = MailGenerator.generate(response)
    const message = {
      from: process.env.EMAIL,
      to: emailPenerima,
      subject: 'Verifcation OTP',
      html: mail
    }

    const hashCode = await encryptedKode(otp.toString())

    const currentOtPCode = await findOtpCode(userId)

    if (currentOtPCode) {
      await updateOtpServices({ code: hashCode }, userId)
    } else {
      await createOtpServices({ userId, code: hashCode })
    }

    transporter
      .sendMail(message)
      .then(() => {
        return res
          .status(200)
          .json({ status: 'OK', message: 'Email sent successfully' })
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ status: 'Faild', message: error.message })
      })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const confirimCodeOtp = async (req, res) => {
  try {
    const userId = req.user.id
    await confimOtpServices(userId, req.body)
    res.redirect('/api/courses')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { sendOtp, confirimCodeOtp }
