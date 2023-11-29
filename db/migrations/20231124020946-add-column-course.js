'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Courses', 'telegram_group', {
      type: Sequelize.STRING
    })
    queryInterface.addColumn('Courses', 'on_boarding', {
      type: Sequelize.STRING
    })
    queryInterface.addColumn('Courses', 'introduction_video', {
      type: Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Courses', 'telegram_group')
    queryInterface.removeColumn('Courses', 'on_boarding')
    queryInterface.removeColumn('Courses', 'introduction_video')
  }
}
