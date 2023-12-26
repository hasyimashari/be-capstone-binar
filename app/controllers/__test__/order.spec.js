const { createOrder, getAllOrder, detailOrder, getAllOrderByUser } = require('../order.js')

const orderServices = require('../../services/order.js')

jest.mock('../../services/order.js', () => ({
  createOrderServices: jest.fn(),
  getAllOrderServices: jest.fn(),
  detailOrderServices: jest.fn()
}))

const order = {
  id: 'bedd0f06-6f0d-4cb0-8158-8b51878687979',
  user_id: 'bedd0f06-6f0d-4cb0-8158-86789798896',
  course_id: 'bedd0f06-6f0d-4cb0-8158-87687687673',
  order_method: 'Credit Card',
  status: 'Sudah Bayar'
}

describe('#createOrder', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      body: {
        course_id: 'bedd0f06-6f0d-4cb0-8158-8b51848f8693'
      },
      user: {
        id: 'bedd0f06-6f0d-4cb0-8158-8b51848f876881'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await orderServices.createOrderServices.mockReturnValue(order)
    await createOrder(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Create order success',
      data: order
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error('FAIL')
    const mockRequest = {
      body: {
        course_id: 'bedd0f06-6f0d-4cb0-8158-8b51848f8693'
      },
      user: {
        id: 'bedd0f06-6f0d-4cb0-8158-8b51848f876881'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await orderServices.createOrderServices.mockReturnValue(Promise.reject(error))
    await createOrder(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#getAllOrder', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {}

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await orderServices.getAllOrderServices.mockReturnValue(order)
    await getAllOrder(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get all order success',
      data: order
    })
  })

  it('should return 500 response failed', async () => {
    const error = new Error('FAIL')

    const mockRequest = {}

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await orderServices.getAllOrderServices.mockReturnValue(Promise.reject(error))
    await getAllOrder(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#detailOrder', () => {
  it('should retrun 200 response success', async () => {
    const mockRequest = {
      params: {
        id: 'bedd0f06-6f0d-4cb0-8158-87687687673'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await orderServices.detailOrderServices.mockReturnValue(order)
    await detailOrder(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get detail order success',
      data: order
    })
  })

  it('should retrun 500 response FAIL', async () => {
    const error = new Error('faild')

    const mockRequest = {
      params: {
        id: 'bedd0f06-6f0d-4cb0-8158-87687687673'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await orderServices.detailOrderServices.mockReturnValue(Promise.reject(error))
    await detailOrder(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#getAllOrderByUser', () => {
  it('should return 200 with response success', async () => {
    const mockRequest = {
      user: {
        id: 'bedd0f06-6f0d-4cb0-8158-8b51878687979'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await orderServices.getAllOrderServices.mockReturnValue(order)
    await getAllOrderByUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get all order success',
      data: order
    })
  })

  it('should return 500 with response FAIL', async () => {
    const error = new Error('FAIL')
    const mockRequest = {
      user: {
        id: 'bedd0f06-6f0d-4cb0-8158-8b51878687979'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await orderServices.getAllOrderServices.mockReturnValue(Promise.reject(error))
    await getAllOrderByUser(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})
