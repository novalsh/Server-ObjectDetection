const { Sequelize } = require('sequelize');
require('dotenv').config(); 
const env = process.env.NODE_ENV || 'development'; 

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false
  //   },
  //   connectTimeout: 20000,
  // },
});

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialectOptions: {
//     ssl: { // <1>
//       rejectUnauthorized: true,
//     }
//   },
// })

module.exports = sequelize;
