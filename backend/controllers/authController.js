const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Admin } = require('../models');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm admin theo username
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    // Kiểm tra mật khẩu
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    // Tạo JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // token có hạn 1 ngày
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
