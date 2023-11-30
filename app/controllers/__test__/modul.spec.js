const { createModule, getAllModule, getDetailModule } = require('../module.js')

const moduleServices = require('../../services/module.js')

jest.mock('../../services/module.js', () => ({
  createModuleService: jest.fn(),
  getAllModulesService: jest.fn(),
  getDetailModuleServices: jest.fn()
}))

const modules = {
  chapter_id: 'chapter_id',
  index: 1,
  name: 'modul lorem ipsum',
  video: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
  duration: 10,
  createdAt: new Date(),
  updatedAt: new Date()
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

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'Ok',
      message: 'Create module success',
      data: modules
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error('Failed')

    const mockRequest = {
      body: {
        modules
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await moduleServices.createModuleService.mockReturnValue(Promise.reject(error))
    await createModule(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
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
      status: 'Ok',
      message: 'Get all module success',
      data: [modules]
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error('Failed')
    const mockRequest = {
      query: {
        chapter_id: 'thisischapterid'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await moduleServices.getAllModulesService.mockReturnValue(Promise.reject(error))
    await getAllModule(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#getDetailModule', () => {
  it('should return 201 response success', async () => {
    const mockRequest = {
      params: {
        id: 'Thisisimodule'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await moduleServices.getDetailModuleServices.mockReturnValue(modules)
    await getDetailModule(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'Ok',
      message: 'Get detail module success',
      data: modules
    })
  })

  it('should return 500 response success', async () => {
    const error = new Error('Failed')

    const mockRequest = {
      params: {
        id: 'Thisisimodule'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await moduleServices.getDetailModuleServices.mockReturnValue(Promise.reject(error))
    await getDetailModule(mockRequest, mockResponse)

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})
