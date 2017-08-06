var ObjectID = require('mongodb').ObjectID;

//lista os arquivos
exports.listar = function (req, res) {
    req.db.collection('arquivos').find().toArray(function(err, result) {
        if (err) {
            return console.log(err)
        };

        res.send(result);
    });
};

//cria arquivo
exports.criar = function (req, res){
	var dadosArquivo = req.body;

	        req.db.collection('arquivos').save(dadosArquivo, function(err, result) {
            if (err) {
                return res.sendStatus(503);
            }
            res.sendStatus(201);
        });
}

// remove um arquivo utilizando o id
exports.apagar = function (req, res) {
  var id = req.params.id;

  req.db.collection('arquivos').remove({_id: ObjectID(id)}, {justOne: true}, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.sendStatus(200);
  });
};


// recupera um arquivo utilizando o id
exports.recuperar = function (req, res) {
  var id = req.params.id;

  req.db.collection('arquivos').findOne({_id: ObjectID(id)}, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    if (!result) {
      return res.send(404);
    }

      res.send(result);
  });
};

//conta arquivos
exports.contar = function (req, res) {
  req.db.collection('arquivos').count({}, function(err, result){
    if (err) {
      res.sendStatus(503);
    }
 
    res.send({contagem: result});
  }); 
}


