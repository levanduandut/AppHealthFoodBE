'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // fullName: DataTypes.STRING,
    // avatar: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    // age: DataTypes.INTEGER,
    // address: DataTypes.STRING,
    // height: DataTypes.FLOAT,
    // weight: DataTypes.FLOAT,
    // sick: DataTypes.STRING,
    // heartBeat: DataTypes.FLOAT,
    // bloodPressureTh: DataTypes.FLOAT,
    // bloodPressureTr: DataTypes.FLOAT,
    // bloodSugar: DataTypes.FLOAT,
    // roleId: DataTypes.STRING
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

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
