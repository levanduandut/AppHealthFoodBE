'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Blogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
            tag: {
                type: Sequelize.STRING
            },
            star: {
                type: Sequelize.FLOAT
            },
            detail: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.TEXT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Blogs');
    }
};