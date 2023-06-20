'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

  class Sensor extends Model {
    static associate(models) {
      Sensor.belongsTo(models.Branch, { foreignKey: 'branch_id' });
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isOn : {
      type : DataTypes.ENUM('on','off'),
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

module.exports = Sensor;