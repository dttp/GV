angular.module('gv.app.core')
    .controller('coreCtrl', function ($scope, $category) {

        $scope.headerMenu = {
            'en': [{
                    Id: 'home',
                    Name: 'Home',
                    Url: '/'
                },
                {
                    Id: 'services',
                    Name: 'Services',
                    Url: '/',
                    Items: []
                },
                {
                    Id: 'contact',
                    Name: 'Contact Us',
                    Url: '/contact',
                }],
            'vn': [{
                    Id: 'home',
                    Name: 'Trang chủ',
                    Url: '/'
                },
                {
                    Id: 'services',
                    Name: 'Dịch vụ',
                    Url: '/',
                    Items: []
                },
                {
                    Id: 'contact',
                    Name: 'Liên hệ',
                    Url: '/contact'
                }]
        };

        $scope.categories = [];
        $scope.init = function () {
            $category.getCategories('', $scope.selectedLanguage.value).then(function (response) {
                $scope.categories = response.data;
                var serviceMenuItem = _.find($scope.headerMenu[$scope.selectedLanguage.value], { Id: 'services'});
                serviceMenuItem.Items = [];
                _.each($scope.categories, function (c) {
                    serviceMenuItem.Items.push({
                        Id: c.Id,
                        Name: c.Name,
                        Url: '/category?id=' + c.Id,
                    });
                });
            });
        };

        $scope.$on('languageChanged', function () { $scope.init(); });
        $scope.$on('appInitialized', function () { $scope.init(); });
    });