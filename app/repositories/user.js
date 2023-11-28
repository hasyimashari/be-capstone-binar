const { User } = require('../models')

const create = (argRequest) => {
  return User.create(argRequest)
}

const findByEmail = (email) => {
  return User.findOne({
    where: {
      email
    }
  })
}

const findByPk = (id) => {
  return User.findByPk(id)
}

const updateUser = (argRequest, id) => {
  return User.update(argRequest, {
    where: { id }, returning: true
  })
}

const updateResetTokenPasswordRepo = (argRequest, email) => {
  return User.update(argRequest, {
    where: { email }, returning: true
  })
}

const resetPasswordRepo = (argRequest, tokenResetPassword) => {
  return User.update(argRequest, {
    where: { tokenResetPassword }, returning: true
  })
}

module.exports = { create, findByEmail, findByPk, updateUser, updateResetTokenPasswordRepo, resetPasswordRepo }
