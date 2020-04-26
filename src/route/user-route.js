const express = require('express')
var router = express.Router(); //interceptação das rotas
const userController = require("../app/controller/user-controller");

router.post('/create', userController.post);
router.post('/authenticate', userController.Authenticate)
router.post('/recuperar_senha', userController.recuperar_senha)
router.post('/redefinir_senha', userController.redefinir_senha)
//exports.post(, async (req, res) => {
router.get('/login', userController.login)
router.get('/', userController.get);
router.get('/:id', userController.getById);

router.put('/:id', userController.update);

router.delete('/:id', userController.del);

module.exports = router;