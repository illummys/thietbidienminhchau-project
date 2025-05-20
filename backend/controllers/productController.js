const { Product, Category, Brand } = require('../models');

// GET /api/products
exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Category, Brand]
    });
    res.json(products);
  } catch (err) { next(err); }
};

// GET /api/products/:id
exports.getById = async (req, res, next) => {
  try {
    const p = await Product.findByPk(req.params.id, { include: [Category, Brand] });
    if (!p) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(p);
  } catch (err) { next(err); }
};

// POST /api/products
exports.create = async (req, res, next) => {
  try {
    const p = await Product.create(req.body);
    res.status(201).json(p);
  } catch (err) { next(err); }
};

// PUT /api/products/:id
exports.update = async (req, res, next) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) { next(err); }
};

// DELETE /api/products/:id
exports.remove = async (req, res, next) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Xóa thành công' });
  } catch (err) { next(err); }
};
