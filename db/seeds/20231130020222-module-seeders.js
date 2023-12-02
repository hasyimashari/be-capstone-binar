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
    const getRandomChapterId = async () => {
      const getRandomChapter = await Chapter.findOne({
        order: Sequelize.literal('random()')
      })

      return getRandomChapter.dataValues.id
    }

    await queryInterface.bulkInsert('Modules', [
      {
        chapter_id: await getRandomChapterId(),
        index: 0,
        name: 'modul lorem ipsum',
        video: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
        duration: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        chapter_id: await getRandomChapterId(),
        index: 0,
        name: 'modul lorem ipsum',
        video: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
        duration: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        chapter_id: await getRandomChapterId(),
        index: 0,
        name: 'modul lorem ipsum',
        video: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
        duration: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}
    )
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
