'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Exercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Exercise.init({
        name: DataTypes.STRING,
        detail: DataTypes.TEXT,
        sickId: DataTypes.INTEGER,
        sickId1: DataTypes.INTEGER,
        sickId2: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        time: DataTypes.INTEGER,
        star: DataTypes.FLOAT,
        image:DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Exercise',
    });
    return Exercise;
};