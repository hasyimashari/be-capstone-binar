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
    const getRandomCourse = await Course.findOne({
      order: Sequelize.literal('random()')
    })
    const randomCourseID = getRandomCourse.dataValues.id

    await queryInterface.bulkInsert('Chapters', [{
      course_id: randomCourseID,
      index: 1,
      name: 'chapter lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
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
