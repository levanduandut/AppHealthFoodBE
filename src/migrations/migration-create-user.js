'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      age: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.FLOAT
      },
      weight: {
        type: Sequelize.FLOAT
      },
      sick: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      heartBeat: {
        type: Sequelize.FLOAT
      },
      bloodPressureTh: {
        type: Sequelize.FLOAT
      },
      bloodPressureTr: {
        type: Sequelize.FLOAT
      },
      bloodSugar: {
        type: Sequelize.FLOAT
      },
      roleId: {
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};