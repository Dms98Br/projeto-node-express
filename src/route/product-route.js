const express = require('express')
var router = express.Router(); //interceptação das rotas
const productController = require("../app/controller/product-controller")

router.post('/', productController.post);
router.get('/', productController.get);
router.get('/:productId', productController.getById);
router.put('/:productId', productController.update);
router.delete('/:productId',productController.del);

module.exports = router;