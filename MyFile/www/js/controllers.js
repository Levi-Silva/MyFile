angular.module('starter.controllers', [])
  .controller('LoginController', function($scope, $state) {

  $scope.login = function () {
        $state.go('app.arquivos')
  }

  $scope.cadastro = function () {
        $state.go('cadastro')
  }

})

.controller('CadastroController', function($scope, $state) {
    $scope.salvar = function () {
        $state.go('grupoMais')
    }
})

.controller('AppController', function($scope, $ionicModal, $timeout) {

})

.controller('GruposController', function($scope, $http) {
  $http.get('http://localhost:3000/grupo').then(function(reposta){
    $scope.grupos = reposta.data;
  });
})

.controller('UploadController', function($scope, $http) {

    $scope.enviar = function(){
      var formData = new FormData();
      var arquivo = document.getElementById("arquivoInput").files[0];
      formData.append("file", arquivo);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var div = document.getElementById('mensagem');
          var resposta = xhr.responseText;
          div.innerHTML += resposta;
          }
        }
        xhr.open("POST", "http://localhost:3000/upload");
        xhr.send(formData);
      }
  })

.controller('ArquivosController', function($scope, $http) {
    $http.get('http://localhost:3000/arquivo').then(function(reposta){
    $scope.arquivos = reposta.data;
     });
})

.controller('DetalheArquivoController', function($scope, $stateParams, ServiceArquivos) {
    $scope.arquivo = ServiceArquivos.get($stateParams.id);
})

.controller('PerfilController', function($scope, $http, $ionicPopup) {
   $http.get('http://localhost:3000/contar').then(function(reposta){
   $scope.countArquivos = reposta.data.contagem;
   });

   $http.get('http://localhost:3000/contargrupo').then(function(reposta){
   $scope.countGrupos = reposta.data.contagem;
  });

       $scope.showPopup = function() {
      $scope.data = {}
       var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model">',
         title: 'Crie seu grupo!',
         scope: $scope,
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Criar</b>',
               type: 'button-positive',
                  onTap: function(e) {
                     if (!$scope.data.model) {
                           e.preventDefault();
                     } else {
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });
      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });
   };

     $scope.showPopupTwo = function() {
      $scope.data = {}
       var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model">',
         title: 'Digite o nome do grupo',
         scope: $scope,
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Buscar</b>',
               type: 'button-positive',
                  onTap: function(e) {
                     if (!$scope.data.model) {
                           e.preventDefault();
                     } else {
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });
      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });
   };

})

// .controller('GrupoMaisController', function($scope) {


// })

.controller('GaleriaController', function($scope) {
  $scope.galerias = [
    {
      nome:''
    }
  ];
})

.controller('AppCtrl', function($scope, $ionicActionSheet) {

  $scope.showActionsheet = function() {

    $ionicActionSheet.show({
      titleText: 'ActionSheet Example',
      buttons: [
        { text: '<i class="icon ion-share"></i> Share' },
        { text: '<i class="icon ion-arrow-move"></i> Move' },
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  };
});
