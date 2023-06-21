'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Absorb extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Absorb.init({
        idUser:DataTypes.INTEGER,
        eat: DataTypes.TEXT,
        totalCalo: DataTypes.FLOAT,
        totalTinhBot: DataTypes.FLOAT,
        totalCho: DataTypes.FLOAT,
        totalFatSat: DataTypes.FLOAT,
        totalFatTotal: DataTypes.FLOAT,
        totalChatXo: DataTypes.FLOAT,
        totalKali: DataTypes.FLOAT,
        totalPro: DataTypes.FLOAT,
        totalSize: DataTypes.FLOAT,
        totalNatri: DataTypes.FLOAT,
        totalSugar: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Absorb',
    });
    return Absorb;
};