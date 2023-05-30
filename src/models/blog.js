'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Blog.init({
        title: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        tag: DataTypes.STRING,
        star: DataTypes.FLOAT,
        detail: DataTypes.TEXT,
        image: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Blog',
    });
    return Blog;
};