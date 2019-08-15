var module = angular.module('ucms.setpassword.app', ['ngHttp', 'ngStorage', 'authService']);
module.controller('setPasswordCtrl', function ($scope, $localStorage, $http, authService) {
    $scope.user = {};
    $scope.loading = false;

    $scope.init = function () {
        var username = Utils.getParameterByName("username");
        var token = Utils.getParameterByName("token");
        $scope.user = {
            UserName: username,
            Token: token
        };
    };

    $scope.isMatchedPassword = function () {
        return  $scope.user.Password &&
                $scope.user.Password != '' &&
                $scope.user.NewPassword == $scope.user.Password;
    };

    $scope.hasError = function () {
        return !$scope.user.Password || $scope.user.Password.trim() == "";
    };

    $scope.hasError = function (field, errorType) {
        switch (errorType) {
            case 'required':
                return field && field.$dirty && field.$error.required;
            case 'pattern':
                return field && field.$dirty && field.$error.pattern;
            case 'invalid':
                return field && field.$dirty && field.$invalid;
            default:
                return false;
        }
    }

    // click submit button
    $scope.submit = function () {
        $scope.loading = true;

        // request to save new password
        $http.post(WEBAPI_ENDPOINT + '/api/user/setpassword?', $scope.user).then(function (response) {
            // log user in
            authService.login($scope.user.UserName, $scope.user.Password).then(function () {
                location.href = '/';
            });
        }, function (err) {
            $scope.errorMessage = err.data.Message;
            $scope.loading = false;
        });
    }

});

