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
        type: Sequelize.BIGINT,
        reference: {
          model: 'User',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.DOUBLE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pets');
  }
};
