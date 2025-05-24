require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Auth route (admin)
app.use('/admin/auth', require('./routes/auth'));

// Public routes
app.use('/api/product',  require('./routes/product'));
app.use('/api/category', require('./routes/category'));
app.use('/api/brand',    require('./routes/brand'));
app.use('/api/order',    require('./routes/order'));

// Admin routes: thêm authMiddleware trước khi vào CRUD
app.use('/admin/product',  authMiddleware, require('./routes/product'));
app.use('/admin/category', authMiddleware, require('./routes/category'));
app.use('/admin/brand',    authMiddleware, require('./routes/brand'));
app.use('/admin/order',    authMiddleware, require('./routes/order'));

// Error handler
app.use(errorHandler);

sequelize.authenticate()
  .then(() => sequelize.sync({ alter: false }))
  .then(() => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    console.log('DB_USER=', process.env.DB_USER);
    console.log('DB_PASSWORD=', process.env.DB_PASSWORD);

  })
  .catch(err => console.error('DB connection failed:', err));
