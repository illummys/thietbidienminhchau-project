const sequelize = require('../config/db');
const Category  = require('./category');
const Brand     = require('./brand');
const Product   = require('./product');
const Order     = require('./order');
const OrderItem = require('./orderItem');

// Quan hệ
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Brand.hasMany(Product, { foreignKey: 'brand_id' });
Product.belongsTo(Brand, { foreignKey: 'brand_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  sequelize,
  Category,
  Brand,
  Product,
  Order,
  OrderItem
};
