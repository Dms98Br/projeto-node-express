const express = require('express')
var router = express.Router(); //interceptação das rotas
const projectController = require("../app/controller/project-controller");
const authMiddleware = require('../app/middlewares/auth-middlewares')

router.get('/', projectController.get, router.use(authMiddleware));
//router.use(authMiddleware)
module.exports = router;