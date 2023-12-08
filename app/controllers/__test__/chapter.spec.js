const { createChapter, getAllChapter } = require('../chapter')

const chapterServices = require('../../services/chapter.js')

jest.mock('../../services/chapter.js', () => ({
  createChapterService: jest.fn(),
  getAllChaptersService: jest.fn()
}))

const chapter = {
  course_id: 'id_course',
  index: 1,
  name: 'chapter lorem ipsum',
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('#createChapter', () => {
  it('should return 200 response success', async () => {
    const mockRequest = {
      body: {
        chapter
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.createChapterService.mockReturnValue(chapter)
    await createChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Create chapter success',
      data: chapter
    })
  })

  it('should return 500 response Failed', async () => {
    const error = new Error('Failed')
    const mockRequest = {
      body: {
        chapter
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.createChapterService.mockReturnValue(Promise.reject(error))
    await createChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(500)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'FAIL',
      message: error.message
    })
  })
})

describe('#getAllChapters', () => {
  it('shouls return 200 response success', async () => {
    const mockRequest = {
      query: {
        course_id: 'course_id'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.getAllChaptersService.mockReturnValue([chapter])
    await getAllChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get all chapter success',
      data: [chapter]
    })
  })

  it('shouls return 200 response success', async () => {
    const mockRequest = {
      query: {
        course_id: 'course_id'
      }
    }

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    await chapterServices.getAllChaptersService.mockReturnValue([chapter])
    await getAllChapter(mockRequest, mockResponse)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'OK',
      message: 'Get all chapter success',
      data: [chapter]
    })
  })
})
