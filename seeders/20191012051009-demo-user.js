'use strict';

const bcrypt = require('bcryptjs')
const password = '123456'

const getPasswordSalt = new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return reject(err)
    return resolve(salt)
  })
})

const getPasswordHash = salt => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return reject(err)
      return resolve(hash)
    })
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await getPasswordSalt
    const hashPassword = await getPasswordHash(salt)
    return queryInterface.bulkInsert(
      'Users',
      [{
        name: 'kiki',
        email: 'kiki@gmail.com',
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      'Users', [{ email }]
    )
  }
};