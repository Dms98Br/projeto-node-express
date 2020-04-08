
const User = require("../models/user");
const repository = require('../repository/user-repository');
//Post
exports.post = async (req, res, next) => {
    try {
        var data = await repository.create(req.body);
        console.log(data)
        res.status(201).send({ message: 'Usuário criado com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao cadastra usuário',
        error: e
        })
    }
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
