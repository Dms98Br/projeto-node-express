const User = require("../models/user")

exports.post = ("/", function (req, res){
    var user = new User();
    user.nome = req.body.nome;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function (error) {
        if (error)
            res.send("Erro ao tentar salvar um user" + error);

        res.status(201).json({ message: 'user inserido com sucesso' });
        console.log(user)
    });

});
//Get All
exports.get = ("/", function (req, res) {
    User.find(function (err, users) {
        if (err)
            res.send(err);

        res.status(200).json({
            message: 'Usuários retornados',
            user: users
        });
    });
});
//FindById
exports.getById = ("/:productId", function (req, res) {
    const id = req.params.productId;

    User.findById(id, function (err, user) {
        if (err) {
            res.status(500).json({
                message: "Erro ao tentar encontrar user, ID mal formado"
            });
        }

        else if (user == null) {
            res.status(400).json({
                message: "user não encontrado"
            });
        }
        else {
            res.status(200).json({
                message: "user encontrado",
                user: user
            });
        }

    });

});