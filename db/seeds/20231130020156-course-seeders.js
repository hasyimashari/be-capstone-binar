'use strict'
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
    const type = ['Premium', 'Free']
    const level = ['Beginner', 'Intermediate', 'Advanced']

    const getRandomCategory = async () => {
      const getRandomCategory = await Category.findOne({
        order: Sequelize.literal('random()')
      })

      return getRandomCategory.dataValues
    }

    const getRandomLevel = (arr) => {
      const courseLevel = arr[Math.floor(Math.random() * arr.length)]

      return [courseLevel]
    }

    const getRandomType = (arr) => {
      const courseType = arr[Math.floor(Math.random() * arr.length)]
      const price = courseType === 'Premium' ? 20000 : 0

      return [courseType, price]
    }

    const rawDummyCourse = [...Array(6)].map(async (_, index) => {
      const { id: category_id, category } = await getRandomCategory()
      const [courseLevel] = getRandomLevel(level)
      const [courseType, price] = getRandomType(type)

      return {
        name: `${category} Course for all`,
        code: `CRS0${index}23`,
        level: courseLevel,
        category_id,
        facilitator: 'Zani',
        price,
        type: courseType,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis id lacus quis iaculis. Suspendisse elementum quam leo, nec condimentum est feugiat in. Donec gravida nisi in augue ultrices, vitae lobortis sapien lacinia. Aenean in ex elit. Cras ante mi, ultricies in tempor a, fermentum quis lorem. Pellentesque non diam facilisis, sodales mauris quis, tincidunt elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla laoreet augue arcu. Nullam bibendum dictum diam, vitae feugiat libero volutpat sed. Nam posuere finibus libero, in euismod elit sodales sed. Aenean a rutrum ipsum. Praesent quam metus, hendrerit a ultrices sed, auctor quis urna. Fusce eu nunc ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec imperdiet ligula vel luctus consectetur',
        on_boarding:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis id lacus quis iaculis. Suspendisse elementum quam leo, nec condimentum est feugiat in.',
        telegram_group: 'https://t.me/+CgHkE3Xy4Dk5ZWM9',
        introduction_video: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    const dummyCourse = await Promise.all(rawDummyCourse)

    await queryInterface.bulkInsert('Courses', dummyCourse, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Courses', null, {})
  }
}
