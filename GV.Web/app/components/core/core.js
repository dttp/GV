angular.module('gv.app.core', ['ngEnter'])
    .controller('coreCtrl', function ($scope, $category, $sidebarMenu) {

        $scope.locale = {
            headerSearchPlaceHolder: {
                en: 'Search',
                vn: 'Tìm kiếm'
            },
            footerContactAddress: {
                en: 'No 60/61 Pham Tuan Tai Street North Tu Liem District, Hanoi, Vietnam',
                vn: 'Số 60/61 Phạm Tuấn Tài, Quận Bắc Từ Liêm, Hà Nội, Việt Nam'
            }            
        };

        $scope.sidebarMenu = {};

        $scope.searchQuery = {
            value: ''
        };

        $scope.invokeSearch = function () {
            $scope.alertSvc.addInfo('Searching with keyword: ' + $scope.searchQuery.value);
        };

        $scope.categories = [];
        $scope.init = function () {
            $scope.sidebarMenu = $sidebarMenu.create();
            //$category.getCategories('', $scope.selectedLanguage.value).then(function (response) {
            //    $scope.categories = response.data;
            //    var serviceMenuItem = _.find($scope.headerMenu[$scope.selectedLanguage.value], { Id: 'services'});
            //    serviceMenuItem.Items = [];
            //    _.each($scope.categories, function (c) {
            //        serviceMenuItem.Items.push({
            //            Id: c.Id,
            //            Name: c.Name,
            //            Url: '/category?id=' + c.Id,
            //        });
            //    });
            //});
        };

        $scope.$on('languageChanged', function () { $scope.init(); });
        $scope.$on('appInitialized', function () { $scope.init(); });
    });