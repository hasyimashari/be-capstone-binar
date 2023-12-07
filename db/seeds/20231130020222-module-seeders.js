'use strict'
const { Chapter } = require('../../app/models')

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
    const getRandomChapter = async () => {
      const getRandomChapter = await Chapter.findOne({
        order: Sequelize.literal('random()')
      })

      return getRandomChapter.dataValues
    }

    const rawDummyModule = [...Array(24)].map(async (_, index) => {
      const { id: chapter_id } = await getRandomChapter()

      return {
        chapter_id,
        index,
        name: 'introduction',
        video: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
        duration: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    const dummyModule = await Promise.all(rawDummyModule)

    await queryInterface.bulkInsert('Modules', dummyModule, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Modules', null, {})
  }
}
