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
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    from_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    to_time: {
      type: DataTypes.DATE,
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
    status: {
      type: DataTypes.ENUM('active', 'non-active'),
      allowNull: false
    },
    conditional: {
      type: DataTypes.ENUM('active', 'non-active'),
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
    modelName: 'Sensor',
    tableName: 'sensor'
  });

module.exports = Sensor;