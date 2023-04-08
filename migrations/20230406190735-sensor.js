"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sensor", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Branch',
          key: 'id'
        },
      },
      from_time : {
        type : Sequelize.DATE,
        allowNull : false
      },
      to_time : {
        type : Sequelize.DATE,
        allowNull : false
      },
      latitude : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      longitude : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      status : {
        type : Sequelize.ENUM('active','non-active'),
        allowNull : false
      },
      conditional : {
        type : Sequelize.ENUM('active','non-active'),
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleteAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("sensor");
  },
};
