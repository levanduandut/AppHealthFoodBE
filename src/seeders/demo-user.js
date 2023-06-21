'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'example@example.com',
      password: '123123',
      fullName: "Le Van Duan",
      age: 23,
      height:167,
      weight:50,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {e
    return queryInterface.bulkDelete('Users', null, {});
  }
};
