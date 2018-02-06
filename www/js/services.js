angular.module('app.services', [])

    .constant('baseUrl', 'data/')

    // Definimos la clase Pregunta
    .service("Question", function () {
        this.id = 0;
        this.text = 'Question';
        this.validAnswer = 1;
        this.userAnswer = null;
        this.status = '';
        this.answers = [
            {
                id: 1,
                text: 'Respuesta 1'
                },
            {
                id: 2,
                text: 'Respuesta 2'
                },
            {
                id: 3,
                text: 'Respuesta 3'
                }
            ];
    })

    .provider("preguntaResource", PreguntaResourceProvider);


function PreguntaResourceProvider() {
    var _baseUrl;
    this.setBaseUrl = function (baseUrl) {
        _baseUrl = baseUrl;
    }
    this.$get = ['$http', function ($http) {
        return new PreguntaResource($http, _baseUrl);
  }]
}


function PreguntaResource($http, baseUrl) {
    /*
        this.get = function (idHipoteca) {
            return new Promise(function (resolve, reject) {
                $http.get(baseUrl + 'pregunta' + idHipoteca + '.json')
                    .then(function successCallback(response) {
                        resolve(response.data);
                    }, function errorCallback(response) {
                        reject(response.data, response.status);
                    })
            });
        }
    */

    this.list = function () {
        return new Promise(function (resolve, reject) {
            $http.get(baseUrl + 'preguntas.json')
                .then(function successCallback(response) {
                    resolve(response.data);
                }, function errorCallback(response) {
                    reject(response.data, response.status)
                })
        })
    }
}
