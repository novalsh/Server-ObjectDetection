'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const History = require('./History');
const Branch = require('./Branch');

  class Sensor extends Model {
    static associate(models) {
      Sensor.belongsTo(Branch, { foreignKey: 'branch_id', as: 'branch' });
      Sensor.hasMany(History, { foreignKey: 'sensor_id', as: 'history'});
    }
  };
  
  Sensor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    isOn : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : 'on'
    },
    isDetected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    modelName: 'Sensor',
    tableName: 'sensor'
  });

  // Sensor.hasOne(History, { foreignKey: 'sensor_id', as: 'history' });

module.exports = Sensor;