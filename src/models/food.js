'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Food extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Food.init({
        name: DataTypes.STRING,
        tag: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        detail: DataTypes.TEXT,
        image: DataTypes.TEXT,
        star: DataTypes.FLOAT,
        calo: DataTypes.FLOAT,
        time: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Food',
    });
    return Food;
};