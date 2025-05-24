const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { sequelize, Admin } = require('../models');

(async () => {
  try {
    await sequelize.authenticate();
    // Đồng bộ nếu cần tạo bảng mới
    await sequelize.sync();

    const username = 'admin';
    const password = '123456';  // đổi theo ý bạn

    const exists = await Admin.findOne({ where: { username } });
    if (exists) {
      console.log(`User "${username}" đã tồn tại.`);
      process.exit(0);
    }

    const admin = await Admin.create({ username, password });
    console.log('Tạo admin mới:', {
      id: admin.id,
      username: admin.username
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
