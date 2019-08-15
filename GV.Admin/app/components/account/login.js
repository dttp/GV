var module = angular.module('gv.app.login', ['ngStorage', 'ngEnter', 'authService']);

module.controller('loginCtrl', function ($scope, authService) {
    $scope.account = {
        username: '',
        password: ''
    };
    $scope.error = null;
    $scope.state = {
        value: 'none'
    };

    $scope.login = function () {
        $scope.state = { value: 'working' };
        var fullUsername = $scope.account.username;
       
        authService.login(fullUsername, $scope.account.password).then(function () {
            location.href = '/';
        }, function (errorResponse) {
            var error = errorResponse.data;
            if (error && error.Message)
                $scope.error = error.Message;
            else {
                $scope.error = 'Unknown error. Please check your connection.';
            }
            $scope.state = { value: 'error' };
        });
    };

    $scope.usernameChanged = function () {
        $scope.state.value = 'none';
        $scope.error = '';
    };

    $scope.init = function() {
        
    };
});