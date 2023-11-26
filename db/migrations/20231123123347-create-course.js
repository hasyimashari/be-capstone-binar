'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {
        type: Sequelize.ENUM('Beginner', 'Intermediate', 'Advanced'),
        allowNull: false
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      facilitator: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rate: {
        type: Sequelize.INTEGER,
        defaultValue: 4.0
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('Premium', 'Free')
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      target_audience: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Courses')
  }
}
