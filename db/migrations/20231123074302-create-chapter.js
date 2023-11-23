'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Chapters', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      class_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Classes',
          key: 'id'
        }
      },
      chapter_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      chapter_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_locked: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Chapters')
  }
}
