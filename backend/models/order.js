const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

module.exports = sequelize.define('Order', {
  id:               { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  customer_name:    { type: DataTypes.STRING, allowNull: false },
  customer_phone:   { type: DataTypes.STRING, allowNull: false },
  customer_address: { type: DataTypes.TEXT, allowNull: false },
  note:             { type: DataTypes.TEXT },
  total_amount:     { type: DataTypes.DECIMAL(10,2), allowNull: false },
  status:           { type: DataTypes.ENUM('pending','processing','completed','cancelled'), defaultValue: 'pending' },
  payment_method:   { type: DataTypes.ENUM('cod','banking'), defaultValue: 'cod' },
  payment_status:   { type: DataTypes.ENUM('pending','paid','failed'), defaultValue: 'pending' },
}, {
  tableName: 'orders'
});
