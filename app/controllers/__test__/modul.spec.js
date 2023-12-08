const { createModule, getAllModule, getDetailModule } = require('../module.js')

const moduleServices = require('../../services/module.js')

jest.mock('../../services/module.js', () => ({
  createModuleService: jest.fn(),
  getAllModulesService: jest.fn(),
  getDetailModuleService: jest.fn()
}))

const modules = {
  id: '5ec9d2c2-d8ca-44b2-9691-148ee1abba34',
  chapter_id: '5ec9d2c2-d8ca-44b2-9691-148ee1abba34',
  index: 1,
  name: 'programming introduction',
  video: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
  duration: 10
}

describe('#createModule', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      body: {
        modules
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await moduleServices.createModuleService.mockReturnValue(modules)
    await createModule(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Create module success',
      data: modules
    })
  })

  // it('should return 500 response failed', async () => {
  //   const error = new Error('Failed')

  //   const mockRequest = {
  //     body: {
  //       modules
  //     }
  //   }

  //   const mockResponse = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn().mockReturnThis()
  //   }

  //   await moduleServices.createModuleService.mockReturnValue(
  //     Promise.reject(error)
  //   )
  //   await createModule(mockRequest, mockResponse)

  //   expect(mockResponse.status).toHaveBeenCalledWith(500)
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     status: 'FAIL',
  //     message: error.message
  //   })
  // })
})

describe('#getAllModule', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      query: {
        chapter_id: 'thisischapterid'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await moduleServices.getAllModulesService.mockReturnValue([modules])
    await getAllModule(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get all modules success',
      data: [modules]
    })
  })

  // it('should return 500 response failed', async () => {
  //   const error = new Error('Failed')
  //   const mockRequest = {
  //     query: {
  //       chapter_id: 'thisischapterid'
  //     }
  //   }

  //   const mockResponse = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn().mockReturnThis()
  //   }

  //   await moduleServices.getAllModulesService.mockReturnValue(
  //     Promise.reject(error)
  //   )
  //   await getAllModule(mockRequest, mockResponse)

  //   expect(mockResponse.status).toHaveBeenCalledWith(500)
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     status: 'FAIL',
  //     message: error.message
  //   })
  // })
})

describe('#getDetailModule', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      params: {
        id: '5ec9d2c2-d8ca-44b2-9691-148ee1abba34'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await moduleServices.getDetailModuleService.mockReturnValue(modules)
    await getDetailModule(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get detail module success',
      data: modules
    })
  })

  // it('should return 500 response success', async () => {
  //   const error = new Error('Failed')

  //   const mockRequest = {
  //     params: {
  //       id: 'Thisisimodule'
  //     }
  //   }

  //   const mockResponse = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn().mockReturnThis()
  //   }

  //   await moduleServices.getDetailModuleServices.mockReturnValue(
  //     Promise.reject(error)
  //   )
  //   await getDetailModule(mockRequest, mockResponse)

  //   expect(mockResponse.status).toHaveBeenCalledWith(500)
  //   expect(mockResponse.json).toHaveBeenCalledWith({
  //     status: 'FAIL',
  //     message: error.message
  //   })
  // })
})
