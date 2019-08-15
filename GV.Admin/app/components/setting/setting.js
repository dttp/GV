var module = angular.module('gv.app.setting');
module.controller('settingCtrl', function ($scope, $modal, $setting) {
    $scope.labels = {
        'en': {
            submitBtnText: 'Submit',
            cancelBtnText: 'Cancel'
        },
        'vn': {
            submitBtnText: 'Submit',
            cancelBtnText: 'Cancel'
        }
    };

    $scope.homepageInfo = null;

    $scope.selectImage = function (imageList) {
        $modal.selectImages(true).then(function (images) {
            _.each(images, function (img) {
                var imgItem = {
                    Url: img.Url,
                    Name: img.Name,
                    Description: ''
                };
                imageList.push(imgItem);
            });
        });
    };

    $scope.remove = function (imageList, item) {

    };

    $scope.submit = function () {
        $setting.saveHomePageInfo($scope.homepageInfo).then(function () {
            $scope.alertSvc.addSuccess('Save succeed');
            location.href= '/';
        });
    };

    $scope.cancel = function () {
        location.href = '/';
    };

    $scope.onLangChanged = function () {
        $scope.init();
    };

    $scope.init = function () {
        $setting.getHomePageInfo().then(function (response) {
            $scope.homepageInfo = response.data;
            if (!$scope.homepageInfo) {
                $scope.homepageInfo = {
                    BannerSlides: [],
                    CertificateSamples: [],
                    ClientImages: []
                };
            }
        });
    };

    $scope.$on('languageChanged', function () { $scope.onLangChanged(); });
    $scope.$on('appInitialized', function () { $scope.init(); });
});