const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

module.exports = sequelize.define('Brand', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:        { type: DataTypes.STRING, allowNull: false },
  slug:        { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  logo_url:    { type: DataTypes.STRING },
  status:      { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' },
}, {
  tableName: 'brands'
});
