
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtoSchema = new Schema({
    nome: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', produtoSchema);