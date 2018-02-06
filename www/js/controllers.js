angular.module('app.controllers', [])

    .controller('TestCtrl', ['$scope', 'Question', 'preguntas', '$ionicModal', function ($scope, Question, preguntas, $ionicModal) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $ionicModal.fromTemplateUrl('templates/resume.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        for (var i = 0; i < preguntas.length; i++) {
            Question = preguntas[i];
        }

        $scope.validAnswers = 0;
        $scope.userStatus = 'looser';
        $scope.userCount = 0;

        var updateUserStatus = function () {
            var avgValidAnswers = ($scope.validAnswers / $scope.preguntas.length) * 100;
            if (avgValidAnswers == 0) {
                $scope.userStatus = 'looser';
            } else if (avgValidAnswers == 100) {
                $scope.userStatus = 'guru';
            } else {
                $scope.userStatus = 'poor';
            }
        }

        var checkCompleted = function () {
            if ($scope.preguntas.length == $scope.userCount) {
                $scope.modal.show();
                //window.location.href = '#/home';
            }
        }

        $scope.reset = function () {
            $scope.modal.remove();
            location.reload();
        }

        $scope.validate = function (pregunta, idAnswer) {
            if (pregunta.userAnswer == null) {
                pregunta.userAnswer = idAnswer;
                $scope.userCount++;
                if (pregunta.validAnswer == idAnswer) {
                    $scope.validAnswers++;
                    pregunta.status = "correct";
                } else {
                    pregunta.status = "wrong";
                }

                updateUserStatus();
                checkCompleted();

                console.log(pregunta.status);
            }
        }


        $scope.preguntas = preguntas;
}]);
