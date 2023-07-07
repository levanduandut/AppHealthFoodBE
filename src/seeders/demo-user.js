'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Genders', [{
      name: 'Nữ',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Nam',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Khác',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Genders', null, {});
  }
};
