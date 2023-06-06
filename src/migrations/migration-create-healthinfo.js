'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('HealthInfos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER
            },
            sickId: {
                type: Sequelize.INTEGER
            },
            haTruong: {
                type: Sequelize.FLOAT
            },
            haThu: {
                type: Sequelize.FLOAT
            },
            duongH: {
                type: Sequelize.FLOAT
            },
            height: {
                type: Sequelize.FLOAT
            },
            weight: {
                type: Sequelize.FLOAT
            },
            bmi: {
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
        await queryInterface.dropTable('HealthInfos');
    }
};