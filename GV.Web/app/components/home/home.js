angular.module('gv.app.home')
    .controller('homeCtrl', function ($scope) {

        $scope.locale = {
            section: {
                services: {
                    title: {
                        en: 'Our Services', 
                        vn: 'Dịch vụ'
                    }
                },
                news: {
                    title: {
                        en: 'News',
                        vn: 'Tin tức'
                    }
                },
                clients: {
                    title: {
                        en: 'Our clients',
                        vn: 'Khách hàng của chúng tôi'
                    }
                }
            }
        }

        $scope.servicesCategories = [];


        $scope.init = function () {
            $scope.sidebarMenu.setActive('sbHome');
        };

        $scope.onLangChanged = function () {
            $scope.init();
        };

        $scope.$on('sidebarMenuReady', function () {
            $scope.servicesCategories = _.find($scope.sidebarMenu.items, {Id: 'cat_0_services'}).Items;
            _.each($scope.servicesCategories, function (item) {
                item.Image = '/app/assets/imgs/' + item.Id + '.png';
            });
        });

        $scope.$on('languageChanged', function () { $scope.onLangChanged(); });
        $scope.$on('appInitialized', function () { $scope.init(); });
    });