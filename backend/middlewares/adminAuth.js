const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc thiếu' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded nên có cấu trúc chung như: { id, username, role, iat, exp }
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Chỉ admin mới được phép truy cập' });
    }
    // Gán thông tin user đã giải mã vào req
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

module.exports = adminAuth;
