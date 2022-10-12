'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      age: {
        type: Sequelize.INTEGER
      },
      animal_type: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      pure_race: {
        type: Sequelize.BOOLEAN
      },
      race: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      vaccinations_up_to_date: {
        type: Sequelize.BOOLEAN
      },
      location_id: {
        type: Sequelize.BIGINT
      },
      user_id: {
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.DOUBLE
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_date: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pets');
  }
};
