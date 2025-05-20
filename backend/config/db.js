const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // bật true để debug SQL
    define: {
      underscored: true,    // created_at thay vì createdAt
      freezeTableName: false
    }
  }
);

module.exports = sequelize;