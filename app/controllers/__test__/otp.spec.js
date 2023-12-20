const { confirimCodeOtp, sendOtp } = require('../otp.js')
const {
  createOtpServices,
  findOtpCode
} = require('../../services/otp.js')
const { encryptedKode } = require('../../services/auth.js')
const nodemailer = require('nodemailer')

const otpServices = require('../../services/otp.js')
const authService = require('../../services/auth.js')

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
  sendMail: jest.fn()
}))

jest.mock('../../services/otp.js', () => ({
  confimOtpServices: jest.fn()
}))

describe('sendOtp function', () => {
  test('sends OTP email and updates OTP code in database', async () => {
    const mockRequest = {
      user: {
        email: 'test@example.com',
        id: 'user123',
        name: 'John Doe'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    otpServices.findOtpCode.mockReturnValue(null)
    otpServices.createOtpServices.mockReturnValue()
    authService.encryptedKode.mockReturnValue('hashed_code')

    // Mocking nodemailer createTransport function
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn(() => Promise.resolve())
    })

    await sendOtp(mockRequest, mockResponse)

    expect(transporter.sendMail).toHaveBeenCalled()
    const sendMailArgs = transporter.sendMail.mock.calls[0][0]
    expect(sendMailArgs.to).toBe(mockRequest.user.email)
    expect(sendMailArgs.subject).toBe('Verifcation OTP')

    // Expectations
    expect(createOtpServices).toHaveBeenCalledWith({
      id: 'user123',
      code: 'hashedCode',
      expire_time: 1300000 // 1000 (current time) + 300000 (5 minutes)
    })

    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.any(Object))
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: process.env.EMAIL,
      to: 'test@example.com',
      subject: 'Verifcation OTP',
      html: expect.any(String)
    })

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Email sent'
    })

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Email sent'
    })

    expect(findOtpCode).toHaveBeenCalledWith(mockRequest.user.id)
    expect(encryptedKode).toHaveBeenCalledWith(expect.any(String)) // You can add more specific checks for the encryptedKode input
    expect(createOtpServices).toHaveBeenCalledWith({
      id: mockRequest.user.id,
      code: 'hashed_code',
      expire_time: expect.any(Number) // You can add more specific checks for expire_time
    })
    expect(updateOtpServices).not.toHaveBeenCalled() // Since there's no existing OTP code
  })
})

describe('#confirimCodeOtp', () => {
  it('should return 200 response success', async () => {
    const message = 'Confirm OTP code success'

    const mockRequest = {
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      },
      body: {
        code1: 1,
        code2: 2,
        code3: 3,
        code4: 4,
        code5: 5,
        code6: 6
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await otpServices.confimOtpServices.mockReturnValue(message)
    await confirimCodeOtp(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error('failed')

    const mockRequest = {
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      },
      body: {
        code1: 1,
        code2: 2,
        code3: 3,
        code4: 4,
        code5: 5,
        code6: 6
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await otpServices.confimOtpServices.mockReturnValue(Promise.reject(error))
    await confirimCodeOtp(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})
