var module = angular.module('gv.app.home', ['slickCarousel']);
module.controller('homeCtrl', function ($scope, $fs) {

    $scope.locale = {
        hero: {
            title: {
                en: 'Welcome to <br> GV Company Ltd',
                vn: 'Chào mừng bàn đến với CTy TNHH GV'
            },
            desc: {
                en: 'We have more than a decade of experience in consulting, in testing, certifying and update regulatory for the above telecommunications and Information technology companies around the world. We have a strong belief that our experts will make your business easier. Thank you for taking the time to visit us. Please give us the opportunity to advise you more.',
                vn: ''
            }
        },
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
    };

    $scope.slickConfig = {
        method: {},
        dots: false,
        infinite: false,
        speed: 300,
        arrows: true,
        variableWidth: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    $scope.clientLoaded = false;
    $scope.clients = [];
    $scope.servicesCategories = [];

    $scope.gotoCategory = function (c) {


    };


    $scope.init = function () {
        $scope.sidebarMenu.setActive('sbHome');
        $scope.clientLoaded = false;
        $fs.getList('clients').then(function (response) {
            $scope.clients = response.data;
            console.log($scope.clients);
            $scope.clientLoaded = true;
        });
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