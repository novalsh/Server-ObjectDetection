
const { Sequelize } = require('sequelize');
require('dotenv').config(); 
const env = process.env.NODE_ENV || 'development'; 

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

module.exports = sequelize;
