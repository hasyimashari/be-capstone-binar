const { loginAdmin, loginUser, currentUser, updateUser, resetPassword } = require('../user.js')

const userServices = require('../../services/user.js')
const authServices = require('../../services/auth.js')

jest.mock('../../services/user.js', () => ({
  registeService: jest.fn(),
  loginAdminSevices: jest.fn(),
  loginUserSevices: jest.fn(),
  detailUserServices: jest.fn(),
  updateUserServices: jest.fn(),
  resetPasswordServices: jest.fn()
}))

jest.mock('../../services/auth.js', () => ({
  createAccessToken: jest.fn(),
  encryptedKode: jest.fn()
}))

const accessToken = 'accessToken'
// describe('#register', () => {
//   it('should return 201 response success', async () => {
//     const otp = await bycrpt.hash('210908', 10)
//     const mockRequest = {
//       body: {
//         name: 'Muzani',
//         email: 'muzani@gmail.com',
//         phone_number: '83767672368',
//         password: 'muzani123'
//       }
//     }

//     const mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis()
//     }

//     await authServices.encryptedKode.mockReturnValue(otp)
//     await userServices.registeService.mockReturnValue(accessToken)
//     authServices.createAccessToken.mockReturnValue(accessToken)
//     await register(mockRequest, mockResponse)

//     expect(mockResponse.json).toHaveBeenCalledWith({
//       status: 'OK',
//       message: 'Success',
//       data: {
//         accessToken
//       }
//     })
//   })

//   // it('should return 500 response faild', async () => {
//   //   const error = new Error('Failed')
//   //   const mockRequest = {
//   //     name: 'Muzani',
//   //     email: 'muzani@gmail.com',
//   //     phone_number: '83767672368',
//   //     password: 'muzani123'
//   //   }

//   //   const mockResponse = {
//   //     status: jest.fn().mockReturnThis(),
//   //     json: jest.fn().mockReturnThis()
//   //   }

//   //   await userServices.registeService.mockReturnValue(Promise.reject(error))
//   //   authServices.createAccessToken.mockReturnValue(null)
//   //   await register(mockRequest, mockResponse)

//   //   expect(mockResponse.status).toHaveBeenCalledWith(500)
//   //   expect(mockResponse.json).toHaveBeenCalledWith({
//   //     message: error.message
//   //   })
//   // })
// })

describe('#loginAdmin', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      id: 'uuidv4',
      password: 'muzani123'
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.loginAdminSevices.mockReturnValue(accessToken)
    authServices.createAccessToken.mockReturnValue(accessToken)
    await loginAdmin(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Success Login',
      data: {
        accessToken
      }
    })
  })

  it('should return 500 response faild', async () => {
    const error = new Error('Failed')
    const mockRequest = {
      id: 'uuidv4',
      password: 'muzani123'
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.loginAdminSevices.mockReturnValue(Promise.reject(error))
    authServices.createAccessToken.mockReturnValue(null)
    await loginAdmin(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#loginUser', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      email: 'muzania@gmail.com',
      password: 'muzani123'
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.loginUserSevices.mockReturnValue(accessToken)
    authServices.createAccessToken.mockReturnValue(accessToken)
    await loginUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Success Login',
      data: {
        accessToken
      }
    })
  })

  it('should return 500 response faild', async () => {
    const error = new Error('Failed')
    const mockRequest = {
      email: 'muza@gmail.com',
      password: 'muzani123'
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.loginUserSevices.mockReturnValue(Promise.reject(error))
    authServices.createAccessToken.mockReturnValue(null)
    await loginUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#currentUser', () => {
  it('should return 200 success get current user', async () => {
    const user = {
      id: '67bb4c0a-b902-4dfd-a85f-eb829775b202',
      name: 'Muzani',
      email: 'muzani@gamil.com',
      phone_number: '+6283767672368',
      password: 'muzani123',
      country: 'Indonesia',
      city: 'Cirebon',
      photo: 'photo.jpg',
      role: 'member'
    }

    const mockRequest = {
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202',
        name: 'muzani',
        email: 'muzani@gmail.com',
        role: 'member'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.detailUserServices.mockReturnValue(user)
    await currentUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Success',
      data: user
    })
  })

  it('should return 500 response faild', async () => {
    const error = new Error('Failed')
    const mockRequest = {
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202',
        name: 'muzani',
        email: 'muzani@gmail.com',
        role: 'member'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.detailUserServices.mockReturnValue(Promise.reject(error))
    await currentUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#updateUser', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      body: {
        name: 'Muzani',
        email: 'muzani@gmail.com',
        phone_number: '83767672368',
        country: 'Indonesia',
        city: 'Cirebon',
        photo: 'image.png'
      },
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.updateUserServices.mockReturnValue([null, mockRequest])
    await updateUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Success updated',
      data: mockRequest
    })
  })

  it('should return 500 response faild', async () => {
    const error = new Error('Faild')

    const mockRequest = {
      body: {
        name: 'Muzani',
        email: 'muzani@gmail.com',
        phone_number: '83767672368',
        country: 'Indonesia',
        city: 'Cirebon',
        photo: 'image.png'
      },
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.updateUserServices.mockReturnValue(Promise.reject(error))
    await updateUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#updatePassword', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      body: {
        old_password: 'muzani123',
        new_password: 'muzani12345',
        confirm_password: 'muzani12345'
      },
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.updateUserServices.mockReturnValue([null, mockRequest])
    await updateUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Success updated',
      data: mockRequest
    })
  })

  it('should return 201 response success', async () => {
    const error = new Error('Faild')

    const mockRequest = {
      body: {
        name: 'Muzani',
        email: 'muzani@gmail.com',
        phone_number: '83767672368',
        country: 'Indonesia',
        city: 'Cirebon',
        photo: 'image.png'
      },
      user: {
        id: '67bb4c0a-b902-4dfd-a85f-eb829775b202'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.updateUserServices.mockReturnValue(Promise.reject(error))
    await updateUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#resetPassword', () => {
  it('should return 200 response success', async () => {
    const message = 'Success'
    const mockRequest = {
      params: {
        id: '123456789'
      },
      body: {
        new_password: 'muzaniganteng',
        confirm_password: 'muzaniganteng'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.resetPasswordServices.mockReturnValue(message)
    await resetPassword(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error('failed')
    const mockRequest = {
      params: {
        id: '123456789'
      },
      body: {
        new_password: 'muzaniganteng',
        confirm_password: 'muzaniganteng'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await userServices.resetPasswordServices.mockReturnValue(Promise.reject(error))
    await resetPassword(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})
