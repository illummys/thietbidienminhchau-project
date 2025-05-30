const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

module.exports = sequelize.define('Product', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:        { type: DataTypes.STRING, allowNull: false },
  code:        { type: DataTypes.STRING, allowNull: false, unique: true },
  slug:        { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  detail:      { type: DataTypes.TEXT },
  image_url:   { type: DataTypes.STRING },
  price:       { type: DataTypes.DECIMAL(10,2), allowNull: false },
  stock:       { type: DataTypes.INTEGER, defaultValue: 0 },
  status:      { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' },
  category_id: { type: DataTypes.INTEGER },
  brand_id:    { type: DataTypes.INTEGER },
}, {
  tableName: 'products'
});
