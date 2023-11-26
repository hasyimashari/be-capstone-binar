const {
  ApplicationError,
  EmailNotFound,
  PasswordWrong
} = require('../../error')
const {
  create,
  findByEmail,
  findByPk,
  updateUser
} = require('../repositories/user.js')
const { encryptedKode, comparePassword } = require('./auth.js')

const registeService = async (argRequest) => {
  try {
    const { name, email, phone_number, password } = argRequest
    const role = 'member'
    const user = await findByEmail(email)
    if (user) {
      throw new ApplicationError('Email terdaftar', 401)
    }
    if (password.length < 8) {
      throw new ApplicationError('Password minimal 8 karakter', 401)
    }
    const hashPassword = await encryptedKode(password)
    const newUser = await create({
      name,
      email,
      phone_number: `+62${phone_number}`,
      password: hashPassword,
      role
    })
    return newUser
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const loginUserSevices = async (argRequest) => {
  try {
    const { email, password } = argRequest
    const user = await findByEmail(email)
    if (!user) {
      throw new EmailNotFound()
    }
    // compare password
    const matchPassword = await comparePassword(password, user.password)
    if (!matchPassword) {
      throw new PasswordWrong()
    }
    return user
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const loginAdminSevices = async (argRequest) => {
  try {
    const { id, password } = argRequest
    const user = await findByPk(id)
    if (id !== user.id) {
      throw new ApplicationError('id salah', 401)
    }
    // compare password
    const matchPassword = await comparePassword(password, user.password)
    if (!matchPassword) {
      throw new ApplicationError('Maaf Password anda salah', 401)
    }
    return user
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const detailUserServices = async (id) => {
  try {
    const user = await findByPk(id)
    if (!user) {
      throw new ApplicationError('User not found', 500)
    }
    return user
  } catch (error) {
    throw new ApplicationError(`${error.message}`, 500)
  }
}

const updateUserServices = async (argRequest, id) => {
  try {
    const newUser = await updateUser(argRequest, id)
    return newUser
  } catch (error) {
    throw new ApplicationError(error.message, 500)
  }
}

const resetPasswordServices = async (argRequest, id) => {
  try {
    const { old_password, new_password, confirm_password } = argRequest
    const currentUser = await findByPk(id)
    const currentPassword = currentUser.password
    const matchPassword = await comparePassword(old_password, currentPassword)
    if (!matchPassword) {
      throw new ApplicationError('Password baru salah', 401)
    }
    if (new_password !== confirm_password) {
      throw new ApplicationError('Password baru salah', 401)
    }
    const hashNew_password = await encryptedKode(new_password)
    const updateUserPassword = await updateUser(
      { password: hashNew_password }, id
    )
    return updateUserPassword
  } catch (error) {
    console.log(error)
    throw new ApplicationError(error.message, 500)
  }
}

module.exports = {
  registeService,
  loginUserSevices,
  loginAdminSevices,
  detailUserServices,
  updateUserServices,
  resetPasswordServices
}
