'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./Users');
const Branch = require('./Branch');
const Sensor = require('./Sensor');

  class History extends Model {
    static associate(models) {
      History.belongsTo(User, { foreignKey: 'user_id', as: 'user'});
      History.belongsTo(Branch, { foreignKey: 'branch_id', as: 'branch'});
      History.belongsTo(Sensor, { foreignKey: 'sensor_id', as: 'sensor'});
    }
  };
  
  History.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sensor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isEmergency: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deleteAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'History',
    tableName: 'history'
  });

  // History.belongsTo(User, { foreignKey: 'user_id', as: 'user'});
  // History.belongsTo(Branch, { foreignKey: 'branch_id', as: 'branch'});
  // History.belongsTo(Sensor, { foreignKey: 'sensor_id', as: 'sensor'});

  module.exports = History;
