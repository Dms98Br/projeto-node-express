const User = require('../app/models/user');
const mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

exports.get = async () => {
    const res = await User.find();
    return res;
}
exports.getById = async (_id) => {
    const res = await User
    .findById(_id);
    return res;
}
exports.create = async(body) =>{
    var user = new User(body);
    await user.save();
}
exports.update = async(_id, data) => {
    await User
    .findByIdAndUpdate(_id,{
        $set:{
            nome: data.nome,
            email: data.email,           
            password: data.password = await bcryptjs.hash(data.password, 10)
        }
    })
}
exports.del = async(_id) => {
    await User
    .findByIdAndRemove(_id)
}
exports.login = async() => {
    const res = await User.find();
    return;
}