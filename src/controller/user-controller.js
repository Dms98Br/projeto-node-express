
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')
const repository = require('../repository/user-repository');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}
//Post
exports.post = async (req, res, next) => {
    
    try {
        const { email } = req.body;
        if (await User.findOne({ email }))
            return res.status(400).send({ message: 'E-mail já cadastrado '})
        else
            var user = await repository.create(req.body)            
            res.status(201).send({ message: 'Usuário criado com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao cadastra usuário'});           
    }
};
//Authenticate
exports.Authenticate = async(req, res) => {
    const{ email, password} = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if(!user)
        return res.status(400).send({ error: 'Usuário não encontrado' });
    
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Senha inválida' });
    
    user.password = undefined;
    res.send({ 
        user,
        token: generateToken({ id: user.id })
    });
};
//Get All
exports.get = async (req, res) => {
    try {
        var data = await repository.get();
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição', 
            error: e
        });
    };
};
//FindById
exports.getById = async (req, res) => {
   try {
       var data = await repository.getById(req.params.id);
       res.status(200).send(data);
   } catch (e) {
       res.status(500).send({
           message: 'Falha ao processar sua requisição',
           error: e
       })
   }
};
//PUT
exports.update = async (req, res) => {
    try {
        var data = await repository.update(req.params.id, req.body)
        res.status(201).send({ message: 'Produto foi atualizado'})
    } catch (e) {
        re.status(400).send({ message: 'Erro ao atualizar',
        error: e})
    }
};
//DELETE
exports.del = async(req, res) => {
    try {
        var data = await repository.del(req.params.id)
        res.status(200).send({ message: 'Produto deletado com sucesso' })
    } catch (e) {
        res.status(400).send({ message: 'Erro ao remover produto',
        error: e
        })
    }
};
