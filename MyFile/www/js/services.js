angular.module('starter.services', [])

  .factory('ServiceGrupos', function() {

  //Serviços gruposMais
    var listaGrupos = [
        {
          nome:'Quem não tem cão, caça com gato',
          id: '1'
        },
        {
          nome:'Quem não tem cão, caça com gato',
          id: '2'
        }
    ];

    return {
      grupos_todos: function() {
        return listaGrupos;
      },

      get: function(id) {
        for (var i = 0; i < listaGrupos.length; i++) {
          if (listaGrupos[i].id == id) {
            return listaGrupos[i];
          }
        }
        return null;
      }
    };

  })

  .factory('ServiceArquivos', function() {

  //Serviços Arquivos
    var listaArquivos = [
      {
        id: '1',
        nome: 'arquivo.x',
        tamanho: '10tbytes',
        extensao: 'mp5',
        descricao: 'Video de gato'
      }
    ];

    return {
      arquivos_todos: function() {
        return listaArquivos;
      },

      get: function(id) {
        console.log(id);
        for (var i = 0; i < listaArquivos.length; i++) {
          console.log(listaArquivos[i])
          if (listaArquivos[i].id == id) {
            return listaArquivos[i];
          }
        }
        return null;
      }
    };

  })
