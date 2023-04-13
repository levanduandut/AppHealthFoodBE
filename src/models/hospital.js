'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Hospital extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Hospital.init({
        name: DataTypes.STRING,
        des:DataTypes.TEXT,
        addressName: DataTypes.STRING,
        addressMap: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Hospital',
    });
    return Hospital;
};