const { Brand } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const brands = await Brand.findAll();
    res.json(brands);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Không tìm thấy thương hiệu' });
    res.json(brand);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).json(newBrand);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const [updated] = await Brand.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy thương hiệu' });
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Brand.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy thương hiệu' });
    res.json({ message: 'Xóa thành công' });
  } catch (err) { next(err); }
};