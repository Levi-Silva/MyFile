var express        = require('express'),
    bodyParser     = require('body-parser'),
    expressMongoDb = require('express-mongo-db'),
    basicAuth      = require('basic-auth'),
    multiparty     = require('connect-multiparty');

var grupoController   = require('./controllers/grupos.js'),
    usuarioController = require('./controllers/usuario.js'),
    arquivoController = require('./controllers/arquivo.js');


// inicializa o express
var app = express();

// inicializa o body parser
app.use(bodyParser.json());

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/myfile'));

// libera acesso à API de qualquer host/cliente
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// inicializa o servidor na porta especificada
app.listen(3000, function() {
  console.log('Acesse o servidor http://localhost:3000');
});


//Config do basic-auth
var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  // traduz o cabecalho Authorization para o objeto user
  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  req.db.collection('usuarios').findOne({usuario: user.name, senha: user.pass}, function(err, result) {
    if (err) {
      return unauthorized(res);
    }

    if (!result) {
      return unauthorized(res);
    }

    next();
  });
}


// Endpoints
app.get('/grupo', grupoController.listar);
app.post('/grupo', grupoController.criar);

app.get('/usuario', usuarioController.listar);
app.post('/usuario', usuarioController.criar);

app.get('/arquivo', arquivoController.listar);
app.post('/arquivo', arquivoController.criar);
app.delete('/arquivo/:id', arquivoController.apagar);

app.route('/upload')
    .post(multiparty(), require('./controllers/upload.js'));

app.get('/contar', arquivoController.contar);
app.get('/contargrupo', grupoController.contargrupo);
