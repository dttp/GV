var module = angular.module('gv.app.category', ['bw.paging']);
module.controller('categoryCtrl', function ($scope, $article, $category) {

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
        }
    };

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

    $scope.gotoArticle = function (a) {
        location.href = '/article?id=' + a.Id;
    };

    function refreshArticleList() {
        var startIndex = ($scope.filter.pageIndex - 1) * $scope.filter.itemsPerPage;
        var id = Utils.getParameterByName("id");

        $article.getByCategory(id, $scope.selectedLanguage.value, false, false, startIndex, $scope.filter.itemsPerPage, $scope.filter.sortBy, $scope.filter.sortAsc).then(function (response) {
            $scope.articles = response.data.Items;
            $scope.filter.Total = response.data.Total;
        });
    }

    $scope.init = function () {
        updateSidebar();

        var id = Utils.getParameterByName("id");
        $category.getById(id, $scope.selectedLanguage.value).then(function (response) {
            $scope.category = response.data;
        });

        refreshArticleList();
    };

    function updateSidebar() {
        var id = Utils.getParameterByName("id");
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