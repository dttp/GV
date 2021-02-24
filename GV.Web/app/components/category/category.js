var module = angular.module('gv.app.category', ['bw.paging', 'slickCarousel'] );
module.controller('categoryCtrl', function ($scope, $article, $category, $fs) {

    $scope.locale = {
        articleList: {
            noArticle: {
                en: 'There are no articles',
                vn: 'Chưa có bài viết nào'
            },
            detailButton: {
                en: 'View Detail',
                vn: 'Xem chi tiết'
            }
        },
        section: {
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

    $scope.filter = {
        pageIndex: 1,
        pageCount: 0,
        itemsPerPage: 10,        
        sortBy: 'LastModifiedDate',
        sortAsc: false,
        Total: 0
    };

    $scope.onPagingAction = function (p) {
        $scope.filter.pageIndex = p;
        refreshArticleList();
    };

    $scope.category = {};
    $scope.articles = [];

    $scope.categores = [];

    $scope.getArticleUrl = function(a) {
        var id = getId();
        if (id === 'cat_1_regulation') {
            return '/category/' + Utils.normalizeUrl(a);
        } else {
            return '/article/' + Utils.normalizeUrl(a);
        }
        
    };

    function refreshArticleList() {
        var startIndex = ($scope.filter.pageIndex - 1) * $scope.filter.itemsPerPage;
        var id = getId();

        var recursive = id === 'cat_0_services' ? true : false;
        $scope.filter.sortBy = id === 'cat_0_services' ? 'CategoryId' : 'LastModifiedDate';
        $scope.filter.sortAsc = id === 'cat_0_services';

        if (id !== 'cat_1_regulation') {
            $article.getByCategory(id, $scope.selectedLanguage.value, false, false, startIndex, $scope.filter.itemsPerPage, $scope.filter.sortBy, $scope.filter.sortAsc, recursive).then(function (response) {
                $scope.articles = response.data.Items;
                $scope.filter.Total = response.data.Total;

                $scope.setInit();
            });
        } else {
            $category.getCategories(id, $scope.selectedLanguage.value).then(function(response) {
                $scope.categories = response.data;
                $scope.articles = _.map($scope.categories,
                    function(c) {
                        return {
                            CategoryId: c.Id,
                            Id: c.Id,
                            Language: c.Lang,
                            Name: c.Name,
                            Description: c.Description,
                            Thumbnail: '/app/assets/imgs/' + c.Id + '.jpg',
                            CreatedDate: '2021-01-01T01:01:01'
                        }
                    });
                $scope.filter.Total = $scope.categories.length;

                $scope.setInit();
            });
        }
    }

    $scope.init = function () {
        updateSidebar();

        var id = getId();
        $category.getById(id, $scope.selectedLanguage.value).then(function (response) {
            $scope.category = response.data;
        });

        if (id === 'cat_0_services' || id === 'cat_1_regulation') {
            $scope.clientLoaded = false;
            $fs.getList('clients').then(function (response) {
                $scope.clients = response.data;
                $scope.clientLoaded = true;
            });
        }

        refreshArticleList();
    };

    function getId() {
        if (location.pathname.toLowerCase() === '/services') {
            return 'cat_0_services';
        } else if (location.pathname.toLowerCase() === '/regulation') {
            return 'cat_1_regulation';
        }else {
            return Utils.getIdFromUrl();
        }
    };

    function updateSidebar() {
        var id = getId();
        $scope.sidebarMenu.setActive(id);
    }

    $scope.$on('sidebarMenuReady', function () {
        updateSidebar();
    });

    $scope.$on('languageChanged', function () {
        $scope.init();
    });

    $scope.$on('appInitialized', function () { $scope.init(); });
});