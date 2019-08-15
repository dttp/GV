var module = angular.module('ucms.app.register', ['ngHttp', 'ngStorage', 'authService']);
module.controller('registerCtrl', function ($scope, $localStorage, $http, authService, $user) {
    $scope.user = {};
    $scope.loading = false;

    $scope.init = function () {
        var username = Utils.getParameterByName("email");
        var domain = "";
        var onlyName = ""
        if (username.indexOf("\\") != -1) {
            domain = username.split("\\")[0];
            onlyName = username.split("\\")[1];
            username = onlyName + "@" + domain;
        }

        $scope.user = {
            UserName: username,
            Email: username,
            External: [
                { Provider: domain, UserName: domain + "\\" + onlyName }
            ]
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
        var register = {
            UserInfo: $scope.user,
            Password: $scope.user.Password
        };
        $user.registerDomain(register).then(function (response) {
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

