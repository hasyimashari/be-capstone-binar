'use strict'
const { Course } = require('../../app/models')

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
    const getRandomCourseId = async () => {
      const getRandomCourse = await Course.findOne({
        order: Sequelize.literal('random()')
      })

      return getRandomCourse.dataValues.id
    }

    await queryInterface.bulkInsert('Chapters', [
      {
        course_id: await getRandomCourseId(),
        index: 0,
        name: 'chapter lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        course_id: await getRandomCourseId(),
        index: 0,
        name: 'chapter lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        course_id: await getRandomCourseId(),
        index: 0,
        name: 'chapter lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
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
