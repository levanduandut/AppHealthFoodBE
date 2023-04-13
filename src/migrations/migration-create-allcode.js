'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('AllCodes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            key: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            value: {
                type: Sequelize.STRING
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('AllCodes');
    }
};