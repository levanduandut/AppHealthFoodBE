'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CategoryExercises', {
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
                type: Sequelize.STRING
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('CategoryExercises');
    }
};