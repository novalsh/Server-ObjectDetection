'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Branch, { foreignKey: 'branch_id' });
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
      type: DataTypes.ENUM('superadmin', 'admin', 'user','security'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'non-active'),
      allowNull: false
    },
    condition: {
      type: DataTypes.ENUM('none', 'emergency'),
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

module.exports = User;
