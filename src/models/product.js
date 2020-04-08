
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtoSchema = new Schema({
    nome:{ 
        type: String,
        required: true,    
    },
    preco: {
        type: Number,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Produto', produtoSchema);
