const express = require('express');
const routerBrand = express.Router();
const brandCtrl   = require('../controllers/brandController');

routerBrand.get('/',    brandCtrl.getAll);
routerBrand.get('/:id', brandCtrl.getById);
routerBrand.post('/',   brandCtrl.create);
routerBrand.put('/:id', brandCtrl.update);
routerBrand.delete('/:id', brandCtrl.remove);

module.exports = routerBrand;