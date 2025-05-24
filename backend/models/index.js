require('dotenv').config();
const sequelize = require('../config/db');
const Product = require('./product');
const Category = require('./category');
const Brand = require('./brand');
const Order = require('./order');
const OrderItem = require('./orderItem');
const Admin = require('./admin'); 

// Quan hệ
Category.hasMany(Product, { foreignKey: 'category_id' });
Brand   .hasMany(Product, { foreignKey: 'brand_id' });
Product .belongsTo(Category, { foreignKey: 'category_id' });
Product .belongsTo(Brand,    { foreignKey: 'brand_id' });

Order.hasMany(OrderItem,   { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product,{ foreignKey: 'product_id' });

module.exports = { sequelize, Product, Category, Brand, Order, OrderItem, Admin };
