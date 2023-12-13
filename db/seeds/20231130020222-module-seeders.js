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

    const linkYT = [
      'https://www.youtube.com/watch?v=xvFZjo5PgG0',
      'https://youtu.be/ixOd42SEUF0',
      'https://youtu.be/DwTkyMJi890',
      'https://youtu.be/rd-590n3H6w',
      'https://youtu.be/HYfG_uCOlhc',
      'https://youtu.be/DmxXl1k0X5g'
    ]

    const getRandomYT = (arr) => {
      const video = arr[Math.floor(Math.random() * arr.length)]

      return [video]
    }

    const rawDummyModule = [...Array(24)].map(async (_, index) => {
      const { id: chapter_id } = await getRandomChapter()
      const [video] = getRandomYT(linkYT)

      return {
        chapter_id,
        index,
        name: 'introduction',
        video,
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
