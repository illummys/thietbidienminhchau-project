const { Product, Category, Brand } = require('../models');
const { Op } = require('sequelize');

// GET /api/products
exports.getAll = async (req, res, next) => {
  try {
    const {
      category: categoryParam,
      category_id,
      limit = 10,
      offset = 0,
      search
    } = req.query;

    const catId = category_id || categoryParam;
    const where = {};
    if (catId) where.category_id = catId;
    if (search) where.name = { [Op.substring]: search };

    const result = await Product.findAndCountAll({
      where,
      include: [Category, Brand],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
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
