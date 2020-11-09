var module = angular.module('gv.app.dashboard');
module.controller('dashboardCtrl', function ($scope) {

    $scope.init = function () {

    };

    $scope.$on('appInitialized', function () { $scope.init(); });
});