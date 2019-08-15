var module = angular.module('ucms.app.user.settings');
module.controller('settingsCtrl', function ($scope, $sidebarMenu) {
    $scope.sidebar = $sidebarMenu.getSetupItems();
    $scope.init = function () {
        // check permission
        $scope.checkProfileByUserName().then(function (res) {
            if (res.data) {
                $scope.getPermissions();
            }
            else {
                window.location = PAGE_403;
            }
        });
    };

    $scope.$on('appInitialized', function () { $scope.init(); });
});