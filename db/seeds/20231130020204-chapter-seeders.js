'use strict'
const { Course } = require('../../app/models')
const { Category } = require('../../app/models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const getRandomCourse = async () => {
      const getRandomCourse = await Course.findOne({
        order: Sequelize.literal('random()')
      })

      return getRandomCourse.dataValues
    }

    const rawDummyChapter = [...Array(12)].map(async (_, index) => {
      const { id: course_id, type: course_type, category_id } = await getRandomCourse()
      const { category: category_name } = await Category.findByPk(category_id)

      const is_locked = course_type === 'Premium' && index >= 1

      return {
        course_id,
        index,
        name: `${category_name} introduction`,
        is_locked,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    const dummyChapter = await Promise.all(rawDummyChapter)

    await queryInterface.bulkInsert('Chapters', dummyChapter, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Chapters', null, {})
  }
}
