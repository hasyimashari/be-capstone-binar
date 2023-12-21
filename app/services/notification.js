const { createNotifRepo, findAllNotifByUser, updateNotifRepo } = require('../repositories/notification.js')
const { ApplicationError } = require('../../error')

const createNotifServices = async (user) => {
  try {
    const title = 'Notifikasi'
    const message = 'Selamat pembelian course telah berhasil'
    const { id: user_id } = user

    const notif = await createNotifRepo({ user_id, title, message })
    return notif
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const findAllNotifServices = async (user) => {
  try {
    const { id: user_id } = user
    const notif = await findAllNotifByUser(user_id)
    return notif
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

const updateNotifServices = async (id) => {
  try {
    const notif = await updateNotifRepo(id)
    return notif
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500)
  }
}

module.exports = { createNotifServices, findAllNotifServices, updateNotifServices }
