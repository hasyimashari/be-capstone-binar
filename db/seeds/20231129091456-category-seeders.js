'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dataCategory = [
      {
        category: 'Android',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1700813814/and_hrlwhs.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Data Science',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1700813837/data_science_et36aw.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'UI/UX',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1700813830/uiux_qxbp0m.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Product Manager',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1700813823/pm_vipxkl.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Web Development',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1700813816/web_yznmro.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'Android',
        image: 'https://res.cloudinary.com/diqvk3qr5/image/upload/v1700813840/ios_ukp63i.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('Categories', dataCategory, {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
