var module = angular.module('gv.app.article.search', ['bw.paging', 'ngStorage']);
module.controller('searchCtrl', function ($scope, $article, $localStorage) {

    $scope.locale = {
        title: {
            en: 'Search result',
            vn: 'Kết quả tìm kiếm'
        },
        subTitle: {
            en: 'Keyword',
            vn: 'Từ khóa'
        },
        articleList: {
            noArticle: {
                en: 'There are no matching items',
                vn: 'Không tìm thấy kết quả nào phù hợp'
            },
            detailButton: {
                en: 'View Detail',
                vn: 'Xem chi tiết'
            }
        }
    };

    $scope.searchQuery = $localStorage.searchQuery;

    $scope.articles = [];

    $scope.onPagingAction = function (p) {
        $scope.searchQuery.pageIndex = p;
        refreshArticleList();
    };

    $scope.articles = [];

    $scope.getArticleUrl = function(a) {
        return '/article/' +  Utils.normalizeUrl(a);
    };

    $scope.gotoArticle = function (a) {
        location.href = '/article?id=' + a.Id;
    };

    function refreshArticleList() {
        var startIndex = ($scope.searchQuery.pageIndex - 1) * $scope.searchQuery.pageSize;

        $article.search($scope.searchQuery.keyword, $scope.selectedLanguage.value, startIndex, $scope.searchQuery.pageSize).then(function (response) {
            $scope.articles = response.data.Items;
            $scope.searchQuery.Total = response.data.Total;
            $scope.setInit();
        });
    }

    $scope.init = function() {
        $localStorage.searchQuery = {};
        refreshArticleList();
    };

    
    $scope.$on('sidebarMenuReady', function () {
    });

    $scope.$on('languageChanged', function () {
        $scope.init();
    });

    $scope.$on('appInitialized', function () { $scope.init(); });
});