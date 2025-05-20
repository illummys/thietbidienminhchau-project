const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Brand = sequelize.define('Brand', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:        { type: DataTypes.STRING(100), allowNull: false },
  slug:        { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  logo_url:    { type: DataTypes.STRING(255) },
  status:      { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' },
}, {
  tableName: 'brands'
});

module.exports = Brand;
