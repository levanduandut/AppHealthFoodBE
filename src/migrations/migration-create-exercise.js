'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Exercises', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            detail: {
                type: Sequelize.TEXT
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
            time: {
                type: Sequelize.INTEGER
            },
            star: {
                type: Sequelize.FLOAT
            },
            image: {
                type: Sequelize.TEXT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Exercises');
    }
};