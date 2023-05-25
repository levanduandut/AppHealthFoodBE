'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Ingredients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.TEXT
            },

            betacaroten: {
                type: Sequelize.FLOAT
            },
            calo: {
                type: Sequelize.FLOAT
            },
            canxi: {
                type: Sequelize.FLOAT
            },
            carb: {
                type: Sequelize.FLOAT
            },
            category: {
                type: Sequelize.STRING
            },
            cholesterol: {
                type: Sequelize.FLOAT
            },
            fat: {
                type: Sequelize.FLOAT
            },
            fe: {
                type: Sequelize.FLOAT
            },
            fiber: {
                type: Sequelize.FLOAT
            },
            kali: {
                type: Sequelize.FLOAT
            },
            natri: {
                type: Sequelize.FLOAT
            },
            photpho: {
                type: Sequelize.FLOAT
            },
            protein: {
                type: Sequelize.FLOAT
            },
            unit: {
                type: Sequelize.STRING
            },
            vita: {
                type: Sequelize.FLOAT
            },
            vitb1: {
                type: Sequelize.FLOAT
            },
            vitc: {
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
        await queryInterface.dropTable('Ingredients');
    }
};