'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const History = require('./History');
const Branch = require('./Branch');

  class User extends Model {
    static associate(models) {
      User.belongsTo(Branch, { foreignKey: 'branch_id', as: 'branch'});
      User.hasMany(History, { foreignKey: 'user_id', as: 'history' });
    }
  };
  
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('superadmin', 'admin','security'),
      allowNull: false
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
    modelName: 'User',
    tableName: 'users'
  });

  // User.hasMany(History, { foreignKey: 'user_id', as: 'history' });

module.exports = User;
