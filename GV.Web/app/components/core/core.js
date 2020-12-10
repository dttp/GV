angular.module('gv.app.core', ['ngEnter', 'ngStorage'])
    .controller('coreCtrl', function ($scope, $localStorage, $sidebarMenu) {

        $scope.locale = {
            headerSearchPlaceHolder: {
                en: 'Search',
                vn: 'Tìm kiếm'
            },
            footerContactAddress: {
                en: 'No 60/61 Pham Tuan Tai Street North Tu Liem District, Hanoi, Vietnam',
                vn: 'Số 60/61 Phạm Tuấn Tài, Quận Bắc Từ Liêm, Hà Nội, Việt Nam'
            },
            errors: {
                keywordTooShort: {
                    en: 'Keyword must have at least 3 characters',
                    vn: 'Từ khóa tìm kiếm phải chứa ít nhất 3 ký tự'
                }
            }
        };

        $scope.sidebarMenu = {};

        $scope.searchQuery = {
            value: ''
        };

        $scope.invokeSearch = function () {
            if ($scope.searchQuery.value.length < 3) {
                $scope.alertSvc.addError($scope.locale.errors.keywordTooShort[$scope.selectedLanguage.value]);
                return;
            } else {
                $localStorage.searchQuery = {
                    value: $scope.searchQuery.value,
                    keyword: $scope.searchQuery.value,
                    pageIndex: 1,
                    pageSize: 20
                };

                location.href = '/article/search';
            }
        };

        $scope.categories = [];
        $scope.init = function () {
            $scope.sidebarMenu = $sidebarMenu.create();
        };

        $scope.$on('languageChanged', function () { $scope.init(); });
        $scope.$on('appInitialized', function () { $scope.init(); });
    });