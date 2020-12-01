angular.module('gv.modal',
    [
        'ui.bootstrap'
    ]
)
.controller('confirmModalCtrl', function ($scope, $uibModalInstance, message) {
    $scope.message = message;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})
.controller('selectImagesModalCtrl', function ($scope, $fs, multiple, $uibModalInstance) {
    $scope.items = [];
    $scope.mode = multiple ? 'multiple' : 'single';
    $scope.currentPath = "";
    $scope.breadcrumb = [];

    $scope.selectItem = function (item) {
        if (item.Type === 'Folder') {
            $scope.setPath(item.Path);
        } else {
            var selected = item.selected;
            if ($scope.mode === 'single') {
                _.each($scope.items, function (x) {
                    x.selected = false;
                });
            }
            item.selected = !selected;
        }
    };

    $scope.setPath = function(path) {
        $scope.currentPath = path.substr(1);
        if (path === '\\') path = '';
        var parts = path.split('\\');
        $scope.breadcrumb = [];
        for (var i = 0; i < parts.length; i ++) {
            var part = parts[i];
            $scope.breadcrumb.push({
                Name: part,
                Path: (i === 0) ? '\\' + part : parts[i - 1] + '\\' + part
            });
        }
        refresh();
    };

    $scope.ok = function () {
        var selectedItems = _.filter($scope.items, { selected: true });
        $uibModalInstance.close(selectedItems);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    function refresh() {
        $fs.getList($scope.currentPath).then(function (response) {
            $scope.items = response.data;
        });
    }

    $scope.init = function () {
        $scope.setPath('\\');
    };

    $scope.canPreview = function (item) {
        var idx = item.Url.lastIndexOf('.');
        var ext = item.Url.substring(idx + 1).toLowerCase();
        if (ext === 'jpg' || ext === 'png' || ext === 'bmp') return true;
        return false;
    };

    $scope.init();
})
.factory('$modal', function ($uibModal) {
    var service = {
        showConfirm: function (message) {
            var confirmModal = $uibModal.open({
                templateUrl: '/app/services/template/confirmModal.html',
                controller: 'confirmModalCtrl',
                backdrop: 'static',
                animation: false,
                resolve: {
                    message: function () { return message; }
                }
            });

            return confirmModal.result;
        },
        selectImages: function (multiple) {
            if (!multiple) multiple = false;
            var selectImagesModal = $uibModal.open({
                templateUrl: '/app/services/template/selectImagesModal.html',
                controller: 'selectImagesModalCtrl',
                backdrop: 'static',
                size: 'lg',
                animation: false,
                resolve: {
                    'multiple': function () { return multiple; }
                }
            });
            return selectImagesModal.result;
        }
    };
    return service;
});