const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get = async () => {
    const res = await Product.find();
    return res;
}
exports.getById = async () => {
    const res = await Product
    .find({});
    return res;
}
exports.create = async(body) =>{
    var product = new Product(body);
    await product.save();
}
exports.update = async(_id, data) => {
    await Product
    .findByIdAndUpdate(_id,{
        $set:{
            nome: data.nome,
            preco: data.preco,
            descricao: data.descricao
        }
    })
}
exports.del = async(_id) => {
    await Product
    .findByIdAndRemove(_id)
}