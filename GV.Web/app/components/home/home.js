﻿var homeModule = angular.module('gv.app.home', ['slickCarousel']);
homeModule.controller('homeCtrl', function ($scope, $fs, $article) {

    $scope.locale = {
        hero: {
            title: {
                en: 'Welcome to <br> GV Company Ltd',
                vn: 'Chào mừng bạn đến <br/> Công ty TNHH GV'
            },
            desc: {
                en: 'We have more than a decade of experience in consulting, in testing, certifying and update regulatory for the above telecommunications and Information technology companies around the world. We have a strong belief that our experts will make your business easier. Thank you for taking the time to visit us. Please give us the opportunity to advise you more.',
                vn: 'Chúng tôi có hơn một thập kỷ kinh nghiệm trong việc tư vấn, kiểm tra, chứng nhận và cập nhật quy định cho các công ty viễn thông và công nghệ thông tin trên khắp thế giới. Chúng tôi tin tưởng mạnh mẽ rằng các chuyên gia của chúng tôi sẽ giúp công việc kinh doanh của bạn trở nên dễ dàng hơn. Cảm ơn bạn đã dành thời gian đến thăm chúng tôi. Hãy cho chúng tôi cơ hội để tư vấn thêm cho bạn.'
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
                    en: 'Regulation',
                    vn: 'Quy định'
                },
                detailButton: {
                    en: 'Detail',
                    vn: 'Chi tiết'
                },
                noArticles: {
                    en: 'There are no articles',
                    vn: 'Chưa có bài viết nào.'
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
        autoplay: true,
        autoplaySpeed: 2500,
        infinite: true,
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
    $scope.regulationArticles = [];

    $scope.articlePaging = {
        pageSize: 2,
        startIndex: 0,
        total: 0
    };

    function getRegulationArticles() {
        $article.getByCategory('cat_1_regulation',
            $scope.selectedLanguage.value,
            false,
            false,
            $scope.articlePaging.startIndex,
            $scope.articlePaging.pageSize,
            'LastModifiedDate',
            false,
            true).then(function(response) {
            $scope.regulationArticles = response.data.Items;
            $scope.articlePaging.total = response.data.Total;
        });
    }

    $scope.getArticleUrl = function(a) {
        return '/article/' +  Utils.normalizeUrl(a);
    };

    $scope.getNextNews = function() {
        $scope.articlePaging.startIndex += 2;
        if ($scope.articlePaging.startIndex >= $scope.articlePaging.total - 2)
            $scope.articlePaging.startIndex = $scope.articlePaging.total - 2; 
        getRegulationArticles();
    };

    $scope.getPrevNews = function() {
        $scope.articlePaging.startIndex -= 2;
        if ($scope.articlePaging.startIndex < 0) $scope.articlePaging.startIndex = 0;
        getRegulationArticles();
    };

    $scope.init = function () {
        $scope.sidebarMenu.setActive('sbHome');
        $scope.clientLoaded = false;
        $fs.getList('clients').then(function (response) {
            $scope.clients = response.data;
            $scope.clientLoaded = true;
        });
        getRegulationArticles();
        $scope.setInit();
    };

    $scope.onLangChanged = function () {
        $scope.init();       
    };

    $scope.$on('sidebarMenuReady', function () {
        $scope.servicesCategories = _.find($scope.sidebarMenu.items, {Id: 'cat_0_services'}).Items;
        _.each($scope.servicesCategories, function (item) {
            item.Image = '/app/assets/imgs/' + item.Id + '.png';
            item.HoverImage = '/app/assets/imgs/' + item.Id + '_hover.png';
        });
    });

    $scope.$on('languageChanged', function () { $scope.onLangChanged(); });
    $scope.$on('appInitialized', function () { $scope.init(); });
});