
const User = require("../../app/models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  crypto = require('crypto');
const fs = require("fs");
const authConfig = require('../../config/auth.json')
const repository = require('../../repository/user-repository');
const mailer = require('../../modulos/mailer')

//#region Gerar token
function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}
//#endregion

//#region Gerar Json
function gerarJson(params = {}){
    
    fs.readFile('input.json', 'utf8', function(err, data) {
        if (err) {
                var dados = [];                
                dados.push({email: params.email , password: params.password})    
                fs.writeFile("input.json", JSON.stringify(dados), function (e) {
                console.log('complete');
                })
            return
         }

            let leaderboard;
            try {
                leaderboard = JSON.parse(data);
            } catch(err) {
                console.log("Error parsing input JSON", err);
                return;
            }

            const user = params.email;
            const password = params.password;
            leaderboard.push({email: params.email , password: params.password});

            // now write the data back to the file
            fs.writeFile('input.json', JSON.stringify(leaderboard), 'utf8', function() {
                if (err) {
                    console.log(err);
                    return;
                }                
            });
        });    
}
//#endregion

//#region Recuperar senha
const express = require('express')
var router = express.Router();

exports.recuperar_senha = async (req, res, next) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });
        
        if(!user)
            return res.status(400).send({error: "Usuário não encontrado"});
        
        const token = crypto.randomBytes(20).toString('hex')
        const now = new Date();
        console.log(1)
        now.setHours(now.getHours() + 1);            
        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }            
        });
        mailer.sendMail({
            to: email,
            from: 'danielm.silva@univem.edu.br',
            template: 'auth/recuperar_senha',
            context: { token }
        }, (err) => {
            if(err)
            {
                return res.status(400).send({ error: err});//'Senha não foi enviada para o email'
            }
            else
                return res.status(200).send({ message: 'Senha foi reenviada para seu e-mail'})
        })

    } catch (e) {
        res.status(400).send({error: "Senha não foi redefinida"});
        console.log(e);
        
    }
};

exports.redefinir_senha = async(req, res, next) =>{
    const { email, token, password} = req.body;
    try {
        const now = new Date();
        const user = await User.findOne({ email })//verifica se o email existe
            .select('+passwordResetToken passwordResetExpires')
        if(!user)
            return res.status(400).send({error: "Usuário não encontrado"});
        if(token !== user.passwordResetToken)//verifica se o token está correto
            return res.status(400).send({ message: 'Token inválido '})        
        if( now > user.passwordResetExpires)
            return res.status(400).send({ message: 'Token expirado, gere um novo' });
        
        user.password = password;
        await user.save();
        res.status(200).send({ message: 'Senha foi redefinida'});
    } catch (e) {
        res.status(400).send({ error: "Erro ao redefinir senha", e })
    }
};
//#endregion

//#region Post
//Post
exports.post = async (req, res, next) => {
    
    try {
        const { email } = req.body;
        if (await User.findOne({ email }))
            return res.status(400).send({ message: 'E-mail já cadastrado '})
        else
            var user = await repository.create(req.body)            
            res.status(201).send({ message: 'Usuário criado com sucesso' });
            gerarJson(user);
    } catch (e) {
        res.status(400).send({ message: 'Erro ao cadastra usuário'});           
    }
};
//#endregion

//#region Login

exports.login = async (req, res, next) => {
    try {
        const{ email, password } = req.body;        
        const user = await User.findOne({ email }).select('+password');
        
        if(!user)
            return res.status(400).send({ error: 'Email inválido' });           
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Senha inválida' });
        
        else            
            res.status(201).send({ message: 'Login efetuado com sucesso' });
            gerarJson(user);
    } catch (e) {
        res.status(400).send({ message: 'Erro'});
    }
}
//#endregion

//#region Auntenticação

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
//#endregion

//#region Get
//Get All
exports.get = async (req, res) => {
    try {
        var data = await repository.get();
        res.status(200).send({
            data: data,
            count: data.length
        });        
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
//#endregion

//#region Update

exports.update = async (req, res) => {
    try {
        var data = await repository.update(req.params.id, req.body)
        res.status(201).send({ message: 'Usuário foi atualizado'})
    } catch (e) {
        re.status(400).send({ message: 'Erro ao atualizar usuário',
        error: e})
    }
};

//#endregion

//#region Delete
exports.del = async(req, res) => {
    try {        
        if(! await User.findOne({_id: req.params.id}))
            {
                res.status(400).send({ message: 'Usário não encontrado'})
                return false
            }
        var data = await repository.del(req.params.id)
        res.status(200).send({ message: 'Usuário deletado com sucesso' })
    } catch (e) {
        res.status(400).send({ message: 'Erro ao remover usuário',
        error: e
        })
    }
};
//#endregion