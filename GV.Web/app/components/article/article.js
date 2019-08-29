angular.module('gv.app.article')
    .controller('articleCtrl', function ($scope, $article, $category, $sce) {
        
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

        $scope.article = {};
        $scope.subCategories = [];

        $scope.trustArticleContent = function () {
            return $sce.trustAsHtml($scope.article.Data);
        };

        $scope.init = function () {
            var id = Utils.getParameterByName("id");

            $article.getById(id, $scope.selectedLanguage.value).then(function (response) {
                $scope.article = response.data;
                
                $category.getRootCategories($scope.article.CategoryId, $scope.selectedLanguage.value).then(function (response) {
                    $scope.subCategories = response.data;
                });
            });
        };

        $scope.$on('languageChanged', function () {
            $scope.init();
        });

        $scope.$on('appInitialized', function () { $scope.init(); });
    });