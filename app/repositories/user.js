const { User } = require('../models')

const create = (argRequest) => {
  return User.create(argRequest)
}

const findByEmail = (argument1) => {
  return User.findOne({
    where: {
      email: argument1
    }
  })
}

const findByPhoneNumber = (argument1) => {
  return User.findOne({
    where: {
      phone_number: argument1
    }
  })
}

const findByPk = (id) => {
  return User.findByPk(id, {
    attributes: {
      exclude: ['password', 'tokenResetPassword', 'createdAt', 'updatedAt']
    }
  })
}

const updateUser = (argRequest, id) => {
  return User.update(argRequest, {
    where: { id },
    returning: true
  })
}

const updateResetTokenPasswordRepo = (argRequest, email) => {
  return User.update(argRequest, {
    where: { email },
    returning: true
  })
}

const resetPasswordRepo = (argRequest, tokenResetPassword) => {
  return User.update(argRequest, {
    where: { tokenResetPassword },
    returning: true
  })
}

module.exports = {
  create,
  findByEmail,
  findByPhoneNumber,
  findByPk,
  updateUser,
  updateResetTokenPasswordRepo,
  resetPasswordRepo
}
