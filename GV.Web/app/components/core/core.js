angular.module('gv.app.core')
    .controller('coreCtrl', function ($scope) {

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
                    Id: 'about',
                    Name: 'About Us',
                    Url: '/#about',
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
                    Id: 'about',
                    Name: 'Giới thiệu',
                    Url: '/#about',
                },
                {
                    Id: 'contact',
                    Name: 'Liên hệ',
                    Url: '/contact'
                }]
        };

        $scope.init = function () {
            console.log('Core init');
        };

        $scope.$on('languageChanged', function () {
        });

        $scope.$on('appInitialized', function () { $scope.init(); });
    });