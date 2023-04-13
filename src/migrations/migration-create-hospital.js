'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Hospitals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            des: {
                type: Sequelize.TEXT
            },
            addressName: {
                type: Sequelize.STRING
            },
            addressMap: {
                type: Sequelize.TEXT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Hospitals');
    }
};