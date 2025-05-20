const express = require('express');
const routerOrder = express.Router();
const orderCtrl   = require('../controllers/orderController');

routerOrder.post('/', orderCtrl.createOrder);
routerOrder.get('/',  orderCtrl.getAllOrders);
routerOrder.get('/:id', orderCtrl.getOrderById);

module.exports = routerOrder;