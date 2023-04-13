'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategoryFood extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CategoryFood.init({
        name: DataTypes.STRING,
        detail: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CategoryFood',
    });
    return CategoryFood;
};