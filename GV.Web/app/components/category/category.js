angular.module('gv.app.category')
    .controller('categoryCtrl', function ($scope, $article, $category, $sce) {
        
        $scope.labels = {
            'en': {
                pageTitle: 'Post',
                homeTitle: 'Home',
                categoriesTitle: 'Categories',
            },
            'vn': {
                pageTitle: 'Bài viết',
                homeTitle: 'Trang chủ',
                categoriesTitle: 'Danh mục',
            }
        };

        $scope.paging = {
            currentPage: 1,
            pageCount: 0,
            itemsPerPage: 4,
            range: []
        };
        $scope.gotoPage = function (p) {
            if (p > $scope.paging.pageCount) return;
            if (p <= 0) return;

            $scope.paging.currentPage = p;
        };
        $scope.filterArticles = function () {
            var startIndex = ($scope.paging.currentPage - 1) * $scope.paging.itemsPerPage;
            var endIndex = startIndex + $scope.paging.itemsPerPage;
            return $scope.articles.slice(startIndex, endIndex);
        };

        $scope.category = {};
        $scope.articles = [];
        $scope.subCategories = [];
        $scope.breadcrumb = {};

        $scope.init = function () {
            var id = Utils.getParameterByName("id");
            $category.getById(id, $scope.selectedLanguage.value).then(function (response) {
                $scope.category = response.data;
            });

            $category.getRootCategories(id, $scope.selectedLanguage.value).then(function (response) {
                $scope.subCategories = response.data;
            });

            $article.getAllByCategory(id, $scope.selectedLanguage.value).then(function (response) {
                $scope.articles = response.data;
                $scope.paging.pageCount = Math.floor($scope.articles.length / $scope.paging.itemsPerPage);
                if ($scope.paging.pageCount * $scope.paging.itemsPerPage < $scope.articles.length) $scope.paging.pageCount ++;
                $scope.paging.range = _.range($scope.paging.pageCount);
                console.log($scope.paging);
            });

            $category.getBreadcrumb(id, $scope.selectedLanguage.value).then(function (response) {
                $scope.breadcrumb = response.data;
            });
        };

        $scope.$on('languageChanged', function () {
            $scope.init();
        });

        $scope.$on('appInitialized', function () { $scope.init(); });
    });