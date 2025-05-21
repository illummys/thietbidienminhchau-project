require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/product', require('./routes/product'));
app.use('/api/category', require('./routes/category'));
app.use('/api/brand', require('./routes/brand'));
app.use('/api/order', require('./routes/order'));

// Error handler
app.use(errorHandler);

// Sync và khởi động
sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(err => console.error('DB connection failed:', err));
