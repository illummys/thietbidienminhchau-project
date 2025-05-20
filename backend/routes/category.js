const express = require('express');
const routerCat = express.Router();
const catCtrl   = require('../controllers/categoryController');

routerCat.get('/',    catCtrl.getAll);
routerCat.get('/:id', catCtrl.getById);
routerCat.post('/',   catCtrl.create);
routerCat.put('/:id', catCtrl.update);
routerCat.delete('/:id', catCtrl.remove);

module.exports = routerCat;