const { Order, OrderItem, Product } = require('../models');

// Tạo đơn hàng (user không cần đăng nhập)
exports.createOrder = async (req, res, next) => {
  const t = await Order.sequelize.transaction();
  try {
    const {
      customer_name,
      customer_phone,
      customer_address,
      note,
      payment_method,
      items // mảng { product_id, quantity, price }
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Đơn hàng không có sản phẩm' });
    }

    // Tính tổng
    const total_amount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      customer_name,
      customer_phone,
      customer_address,
      note,
      payment_method,
      total_amount
    }, { transaction: t });

    // Tạo order items và trừ kho
    for (const item of items) {
      await OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }, { transaction: t });

      // Cập nhật stock
      await Product.decrement(
        { stock: item.quantity },
        { where: { id: item.product_id }, transaction: t }
      );
    }

    await t.commit();
    res.status(201).json({ message: 'Tạo đơn hàng thành công', order_id: order.id });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

// Lấy tất cả đơn hàng (admin)
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ include: OrderItem });
    res.json(orders);
  } catch (err) { next(err); }
};

// Lấy đơn hàng theo id
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: OrderItem });
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    res.json(order);
  } catch (err) { next(err); }
};
