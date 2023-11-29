const { ApplicationError, EmailNotFound, PasswordWrong } = require('./index.js')

describe('#ApplicationError', () => {
  it('should throw message error', () => {
    const error = new ApplicationError('application error', 500)

    expect(error).toHaveProperty('message', 'application error')
    expect(error).toHaveProperty('statusCode', 500)
  })
})

describe('#EmailNotFound', () => {
  it('should throw message error', () => {
    const error = new EmailNotFound('Email tidak di temukan')

    expect(error).toHaveProperty('message', 'Email tidak di temukan')
  })
})

describe('#PasswordWrong', () => {
  it('should throw message error', () => {
    const error = new PasswordWrong('Password Salah')

    expect(error).toHaveProperty('message', 'Password Salah')
  })
})
