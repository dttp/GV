angular.module("ucms.app.services", ["ngHttp"]);
var module = angular.module('ucms.app.forgotpassword', ['ucms.app.services']);
module.controller('forgotPasswordCtrl', function ($scope, $user) {
    $scope.username;
    $scope.user = {};
    $scope.loading = false;

    $scope.hasError = function () {
        return !$scope.username || $scope.username.trim() == "";
    };

    $scope.submitUsername = function () {
        $scope.loading = true;
        $user.verifyUserName($scope.username).then(function (response) {
            $scope.loading = false;
            //if (response.status == "")
            if (!response.data) {
                $scope.errorMessage = "Invalid username. Please re-enter your username.";
                return;
            }
            else {
                $scope.user = response.data;
            }
        });
    }

});

