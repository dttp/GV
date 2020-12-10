var module = angular.module('gv.app.article',[]);
module.controller('articleCtrl', function ($scope, $article, $category, $sce) {
        
    $scope.locale = {        
    };

    $scope.article = {};

    $scope.isServiceArticle = function() {
        return _.startsWith($scope.article.CategoryId, 'cat_svc_');
    };

    $scope.trustArticleContent = function () {
        return $sce.trustAsHtml($scope.article.Data);
    };

    $scope.init = function () {
        var id = Utils.getParameterByName("id");

        $article.getById(id, $scope.selectedLanguage.value).then(function (response) {
            $scope.article = response.data;
            updateSidebar();
        });
    };

    function updateSidebar() {
        if ($scope.article) {
            $scope.sidebarMenu.setActive($scope.article.CategoryId);
        }
    }

    $scope.$on('sidebarMenuReady', function () {
        updateSidebar();
    });

    $scope.$on('languageChanged', function () {
        $scope.init();
    });

    $scope.$on('appInitialized', function () { $scope.init(); });
});