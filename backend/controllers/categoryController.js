const { Category } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    res.json(category);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(201).json(newCat);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const [updated] = await Category.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    res.json({ message: 'Xóa thành công' });
  } catch (err) { next(err); }
};