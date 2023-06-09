'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Health extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Health.init({
        userId: DataTypes.INTEGER,
        sickId: DataTypes.INTEGER,
        haTruong: DataTypes.FLOAT,
        haThu: DataTypes.FLOAT,
        duongH: DataTypes.FLOAT,
        height: DataTypes.FLOAT,
        weight: DataTypes.FLOAT,
        bmi: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Health',
    });
    return Health;
};