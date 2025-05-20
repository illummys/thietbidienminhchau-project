const express = require('express');
const routerProd = express.Router();
const prodCtrl   = require('../controllers/productController');

routerProd.get('/',    prodCtrl.getAll);
routerProd.get('/:id', prodCtrl.getById);
routerProd.post('/',   prodCtrl.create);
routerProd.put('/:id', prodCtrl.update);
routerProd.delete('/:id', prodCtrl.remove);

module.exports = routerProd;