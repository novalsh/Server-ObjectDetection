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
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        indexedDB: true,
        unique: true
      },
      branch_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'branch',
          key: 'id'
        },
      },
      latitude : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      longitude : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      isOn : {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
      },
      isDetected: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
