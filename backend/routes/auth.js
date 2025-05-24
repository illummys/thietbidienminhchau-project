const express = require('express');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const router = express.Router();

// POST /admin/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Tìm admin theo username
    const admin = await Admin.findOne({ where: { username } });
    if (!admin)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Kiểm tra mật khẩu
    const valid = await admin.checkPassword(password);
    if (!valid)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Tạo JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    console.log("JWT_SECRET (login):", process.env.JWT_SECRET);

    // Trả về token
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
