'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Branch extends Model {
        static associate(models) {
            Branch.hasMany(models.User, { foreignKey: 'branch_id' });
            Branch.hasMany(models.Sensor, { foreignKey: 'branch_id' });
        }
    };

    Branch.init({
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
        location: {
            type: DataTypes.STRING,
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
        modelName: 'Branch',
        timestamps: true,
        paranoid: true,
        tableName: 'branch'
    });

    return Branch;
};
