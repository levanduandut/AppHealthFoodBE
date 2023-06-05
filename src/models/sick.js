'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sick extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Sick.init({
        name: DataTypes.STRING,
        tag: DataTypes.STRING,
        detail: DataTypes.TEXT,
        image: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Sick',
    });
    return Sick;
};