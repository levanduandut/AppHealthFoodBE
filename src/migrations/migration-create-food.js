'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Food', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            tag: {
                type: Sequelize.STRING
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
            sickId: {
                type: Sequelize.INTEGER
            },
            sickId1: {
                type: Sequelize.INTEGER
            },
            sickId2: {
                type: Sequelize.INTEGER
            },
            detail: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.TEXT
            },
            star: {
                type: Sequelize.FLOAT
            },
            calo: {
                type: Sequelize.FLOAT
            },
            time: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Food');
    }
};