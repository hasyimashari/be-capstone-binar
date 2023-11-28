'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('OTPs', 'expire_time', {
      type: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('OTPs', 'expire_time')
  }
}
