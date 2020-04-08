const express = require('express');
var router = express = express.Router();

router.use(function (req, res, next){
    console.log("terste")
    next();
});

router.get('/',(req, res) => res.json({message:'Rota'}));
module.exports = router;