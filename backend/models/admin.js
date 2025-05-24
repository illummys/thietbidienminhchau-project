// src/models/admin.js
const { DataTypes } = require('sequelize');
const sequelize     = require('../config/db');
const bcrypt        = require('bcryptjs');

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'admins',
  underscored: true,
  hooks: {
    beforeCreate: async admin => {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, salt);
    }
  }
});

Admin.prototype.checkPassword = function(plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = Admin;
