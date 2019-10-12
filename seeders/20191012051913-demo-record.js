'use strict';

const email = 'kiki@gmail.com'

module.exports = {
  async up(queryInterface, Sequelize) {
    const userId = await queryInterface.rawSelect('Users', { where: { email } }, ['id'])

    if (userId) {
      return queryInterface.bulkInsert(
        'Records',
        [{
          name: '午餐',
          category: 'food',
          date: '2019-06-01',
          amount: 120,
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '修車',
          category: 'other',
          date: '2019-07-02',
          amount: 1200,
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '捷運',
          category: 'traffic',
          date: '2019-07-22',
          amount: 300,
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '撞球',
          category: 'entertainment',
          date: '2019-08-23',
          amount: 120,
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: '清潔用品',
          category: 'home',
          date: '2018-06-07',
          amount: 200,
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        ], {})
    }
  },
  async down(queryInterface, Sequelize) {
    const userId = await queryInterface.rawSelect('Users', { where: { email } }, ['id'])
    if (userId) {
      return queryInterface.bulkDelete('Records', [{ userId },], {})
    }
  }
};