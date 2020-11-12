﻿var galleryModule = angular.module('gv.app.gallery', ['gv.modal', 'angularFileUpload']);
galleryModule.controller('galleryCtrl', function ($scope, $modal, $fs, FileUploader, $localStorage) {
    $scope.items = [];
    $scope.currentPath = '';

    
    var uploader = $scope.uploader = new FileUploader({
        headers: {
            Authorization: 'Basic ' + $localStorage.authData
        },
        url: WEBAPI_ENDPOINT + '/api/fs/upload',
        autoUpload: true
    });

    uploader.onBeforeUploadItem = function (item) {
        var formDataItem = new FormData();
        formDataItem.append('path', $scope.currentPath);
        item.formData.push(formDataItem);
    };

    uploader.onErrorItem = function (fileItem, response, status, headers) {
        $scope.alertSvc.addError(response.Message);
    };

    uploader.onCompleteAll = function () {
        $scope.init();
    };

    $scope.selectFiles = function () {
        angular.element('#fileImport').trigger('click');
    };

    $scope.delete = function (item) {
        $modal.showConfirm('Are you sure you want to delete this file?').then(function () {
            $fs.delete(item.Path).then(function () {
                $scope.alertSvc.addSuccess('Delete item successfully');
                $scope.init();
            });
        });
    };

    $scope.selectItem = function (item) {
        var selected = !item.selected;
        _.each($scope.items, function (item) {
            item.selected = false;
        });
        item.selected = selected;
    };

    $scope.copyUrl = function (item) {
        var body = angular.element(document.body),
            textarea = angular.element('<textarea/>');
            textarea.css({ position: 'fixed', opacity: '0' });
            textarea.val(item.Url);
            body.append(textarea);
            textarea[0].select();
        document.execCommand('copy');
        textarea.remove();
        $scope.alertSvc.addSuccess('Url copied to clipboard');
    };

    $scope.onLangChanged = function () {
        $scope.init();
    };

    $scope.canPreview = function (item) {
        var idx = item.Url.lastIndexOf('.');
        var ext = item.Url.substring(idx + 1).toLowerCase();
        if (ext === 'jpg' || ext === 'png' || ext === 'bmp') return true;
        return false;
    };

    $scope.init = function () {
        $fs.getList($scope.currentPath).then(function (response) {
           $scope.items = response.data;
        });
        $scope.sidebarMenu.setActive('sb-filemanager');
    };

    $scope.$on('languageChanged', function () { $scope.onLangChanged(); });
    $scope.$on('appInitialized', function () { $scope.init(); });
});
