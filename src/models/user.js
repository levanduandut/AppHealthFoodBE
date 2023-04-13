'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    sick: DataTypes.STRING,
    heartBeat: DataTypes.FLOAT,
    bloodPressureTh: DataTypes.FLOAT,
    bloodPressureTr: DataTypes.FLOAT,
    bloodSugar: DataTypes.FLOAT,
    roleId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};