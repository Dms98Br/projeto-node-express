const express = require('express')
var router = express.Router(); //interceptação das rotas
const userController = require("../controller/user-controller");

router.post('/create', userController.post);
router.post('/authenticate', userController.Authenticate)

router.get('/login', userController.login)
router.get('/', userController.get);
router.get('/:id', userController.getById);

router.put('/:id', userController.update);

router.delete('/:id', userController.del);

module.exports = router;