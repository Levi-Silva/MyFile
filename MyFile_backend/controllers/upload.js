var ObjectID = require('mongodb').ObjectID;
// var upload = require('arquivo.js');

var fs = require('fs');
  
module.exports = function(req, res){
  res.setHeader("Access-Control-Allow-Origin", "*");
	  var arquivo = req.files.file;
	  var temporario = req.files.file.path;
	  var nomeArquivo = req.files.file.name;
	  var tipoArquivo = req.files.file.type;
	  var novo = './uploads/' + nomeArquivo;
	 	fs.rename(temporario, novo, function(err){
	 		if(err){
	 			res.status(500).json({error: err});
	 		}
	        req.db.collection('arquivos').save({"nome": nomeArquivo}, function(err, result) {
            if (err) {
                 return res.sendStatus(503).json({error: err});
            }
            res.json({message: "enviado com sucesso." + req.files.file.name, file: novo});
        });
 	})
}