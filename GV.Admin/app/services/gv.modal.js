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

    $scope.selectItem = function (item) {
        var selected = item.selected;
        if ($scope.mode === 'single') {
            _.each($scope.items, function (x) {
                x.selected = false;
            });
        }
        item.selected = !selected;
    };

    $scope.ok = function () {
        var selectedItems = _.filter($scope.items, { selected: true });
        $uibModalInstance.close(selectedItems);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.init = function () {
        $fs.getList().then(function (response) {
            $scope.items = response.data;
        });
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
                resolve: {
                    'multiple': function () { return multiple; }
                }
            });
            return selectImagesModal.result;
        }
    };
    return service;
});