
const Produto = require("../models/product");
const repository = require('../repository/product-repository');
var savereq = []

//#region POST
//Post
exports.post = async (req, res, next) => {
    try {        
        //Salvar um log em outro banco de dados ou em um array
        //novoArray.appemd("data do dia")//Exemplo
        var data = await repository.create(req.body);        
        let params = req.body;

        res.status(201).send({ message: 'Produto criado com sucesso' });
        savereq.push([`${req.method}, ${params.nome}, ${params.preco} e ${params.descricao}`]);
        console.log(savereq);
        // savereq.push({
        //     method: req.method,
        //     nome: params.nome,
        //     preco: params.preco,
        //     descricao: params.descricao
        // })
        
        // console.log("Metodo " + req.method);
        // console.log("Nome " + req.body.nome);
        // console.log("Preço " + req.body.preco);
        // console.log("Descricao " + req.body.descricao);            
        
    } catch (e) {
        res.status(400).send({ message: 'Erro ao cadastra produto ',
        error: e
        })
    }
};
//#endregion

//#region Get
exports.get = async (req, res) => {
    try {
        var data = await repository.get();
            
        res.status(200).send({
            data: data,
            count: data.length
        });
        console.log(req.params);
        
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

//#region 
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
//#endregion

//#region 
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
//#endregion