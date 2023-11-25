'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Moduls', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Courses',
          key: 'id'
        }
      },
      course_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      module_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      module_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      module_video: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_locked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    await queryInterface.dropTable('Moduls')
  }
}
