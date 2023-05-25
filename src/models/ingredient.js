'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ingredient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Ingredient.init({
        betacaroten: DataTypes.FLOAT,
        calo:DataTypes.FLOAT,
        canxi:DataTypes.FLOAT,
        carb:DataTypes.FLOAT,
        category:DataTypes.STRING,
        cholesterol:DataTypes.FLOAT,
        fat:DataTypes.FLOAT,
        fe:DataTypes.FLOAT,
        fiber:DataTypes.FLOAT,
        kali:DataTypes.FLOAT,
        name:DataTypes.STRING,
        natri:DataTypes.FLOAT,
        photpho:DataTypes.FLOAT,
        protein:DataTypes.FLOAT,
        unit:DataTypes.STRING,
        vita:DataTypes.FLOAT,
        vitb1:DataTypes.FLOAT,
        vitc:DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Ingredient',
    });
    return Ingredient;
};