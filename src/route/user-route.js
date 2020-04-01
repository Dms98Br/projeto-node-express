const express = require('express')
var router = express.Router(); //interceptação das rotas
const userController = require("../controller/user-controller");

router.post('/', userController.post);
router.get('/', userController.get);
router.get('/:productId', userController.getById);

module.exports = router;