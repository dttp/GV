angular.module('gv.app.core')
    .controller('coreCtrl', function ($scope, ) {
        $scope.sidebarMenu = {};

        $scope.logout = function () {
            delete $localStorage.authData;
            window.location.href = '/login';
        };

        $scope.isHomePage = function () {
            return location.pathname === '/';
        };

        $scope.init = function () {
            
        };

        $scope.$on('languageChanged', function () {
        });

        $scope.$on('appInitialized', function () { $scope.init(); });
    });