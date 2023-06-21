'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Absorbs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idUser: {
                type: Sequelize.INTEGER
            },
            eat: {
                type: Sequelize.TEXT
            },
            totalCalo: {
                type: Sequelize.FLOAT
            },
            totalTinhBot: {
                type: Sequelize.FLOAT
            },
            totalCho: {
                type: Sequelize.FLOAT
            },
            totalFatSat: {
                type: Sequelize.FLOAT
            },
            totalFatTotal: {
                type: Sequelize.FLOAT
            },
            totalChatXo: {
                type: Sequelize.FLOAT
            },
            totalKali: {
                type: Sequelize.FLOAT
            },
            totalPro: {
                type: Sequelize.FLOAT
            },
            totalSize: {
                type: Sequelize.FLOAT
            },
            totalNatri: {
                type: Sequelize.FLOAT
            },
            totalSugar: {
                type: Sequelize.FLOAT
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
        await queryInterface.dropTable('Absorbs');
    }
};