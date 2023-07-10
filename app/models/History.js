'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

  class History extends Model {
    static associate(models) {
      History.belongsTo(models.User, { foreignKey: 'user_id' });
      History.belongsTo(models.Branch, { foreignKey: 'branch_id' });
      History.belongsTo(models.Sensor, { foreignKey: 'sensor_id' });
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
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
      allowNull: false
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

  module.exports = History;
