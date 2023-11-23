class ApplicationError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

class EmailNotFound extends Error {
  constructor (message) {
    super(message)
    this.message = 'Email tidak di temukan'
  }
}

class PasswordWrong extends Error {
  constructor (message) {
    super(message)
    this.message = 'Password Salah'
  }
}

module.exports = { ApplicationError, EmailNotFound, PasswordWrong }
