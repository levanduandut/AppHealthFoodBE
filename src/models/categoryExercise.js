'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategoryExercise extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CategoryExercise.init({
        name: DataTypes.STRING,
        detail: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'CategoryExercise',
    });
    return CategoryExercise;
};