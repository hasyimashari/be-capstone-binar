'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Courses', 'link_tele', {
      type: Sequelize.STRING
    })
    queryInterface.addColumn('Courses', 'onBoarding', {
      type: Sequelize.STRING
    })
    queryInterface.addColumn('Courses', 'video_intro', {
      type: Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Courses', 'link_tele')
    queryInterface.removeColumn('Courses', 'onBoarding')
    queryInterface.removeColumn('Courses', 'video_intro')
  }
}
