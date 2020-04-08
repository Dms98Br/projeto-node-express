const express = require('express')
var router = express.Router(); //interceptação das rotas
const projectController = require("../controller/project-controller");
const authMiddleware = require('../middlewares/auth-middlewares')

router.get('/', projectController.get, router.use(authMiddleware));
//router.use(authMiddleware)
module.exports = router;