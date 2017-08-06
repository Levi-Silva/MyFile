var ObjectID = require('mongodb').ObjectID;

//lista os usuarios
exports.listar = function (req, res) {
    req.db.collection('usuarios').find().toArray(function(err, result) {
        if (err) {
            return console.log(err)
        };

        res.send(result);
    });
};

//cria usuario
exports.criar = function (req, res){
	var dadosUsuario = req.body;

	        req.db.collection('usuarios').save(dadosUsuario, function(err, result) {
            if (err) {
                return res.sendStatus(503);
            }
            res.sendStatus(201);
        });
}








