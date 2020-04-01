
//importar pacotes 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//ROTAS
//var indexRoute = require('./routes/index-route');
const productRoute = require('../src/route/product-route');
const userRoute = require('../src/route/user-route');

//var config = require('./config')
//PERSISTÊNCIA
mongoose.connect('mongodb+srv://ProFinder:profinder@cluster0-y6z2e.azure.mongodb.net/test');
//mongoose.connect(config.connectionString);

//Configurar a app para usar o body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Definindo a porta onde o servidor vai responder
var port = process.env.port || 3000;

//Dedfinindo uma rota padrão para as minhas apis

//rotas para produtos
app.use('/products', productRoute);
app.use('/user', userRoute)
//rotas para customer


app.listen(port);
console.log("API up and running! on port " + port);


