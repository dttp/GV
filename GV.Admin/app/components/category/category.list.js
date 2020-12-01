var categoryListModule = angular.module('gv.app.category.list', ['gv.modal', 'ui.bootstrap', 'gv.app.category.share']);
categoryListModule.controller('categoryCtrl', function ($scope, $category, $modal, $uibModal, $q, $article) {
    
    $scope.currentCategory = null;
    $scope.categories = [];

    $scope.init = function () {
        var cid = Utils.getParameterByName("cid");        
        if (!cid) 
            location.href = PAGE_500;
        $category.getById(cid, $scope.selectedLanguage.value).then(function (response) {
            $scope.currentCategory = response.data;
            
            $category.getCategories(cid, $scope.selectedLanguage.value).then(function (response) {
                $scope.categories = _.orderBy(response.data,  ['Id'], 'asc');
            });
        });        
    };

    function showCategoryModal(categories) {
        var modal = $uibModal.open({
            templateUrl: '/app/components/category/dialog/category.modal.html',
            controller: 'categoryModalCtrl',
            backdrop: 'static',
            animation: false,
            resolve: {
                categories: function () {return categories;},
                parentId: function () { return null; }
            }
        });

        return modal.result;
    }

    $scope.create = function () {
        showCategoryModal().then(function (result) {
            $category.create(result).then(function () {
                $scope.alertSvc.addSuccess('Create category successful');
                $scope.init();
            });
        });
    };

    $scope.manage = function (c) {
        if (c.ParentId === 'cat_0_services') {
            $article.getByCategory(c.Id, $scope.selectedLanguage.value, true, false).then(function (response) {
                var article = response.data.Items[0];
                location.href = '/article?id=' + article.Id;
            });
        } else {
            location.href = '/category/detail?cid=' + c.Id;
        }
    };

    $scope.edit = function (cat) {
        var cats = [];
        var promises = [];
        _.each($scope.availableLanguages, lang => {
            promises.push($category.getById(cat.Id, lang.value));
        });
        $q.all(promises).then(function (responses) {
            cats.push(responses[0].data);
            cats.push(responses[1].data);
            showCategoryModal(cats).then(function (result) {
                $category.update(result).then(function () {
                    $scope.alertSvc.addSuccess('Update category successful');
                    $scope.init();
                });
            }, function () {});
        });
        
    };

    $scope.delete = function (cat) {
        var confirmMsg = {
            en: 'Are you sure you want to delete this category?',
            vn: 'Bạn có chắc bạn muốn xóa category này không?'
        };

        $modal.showConfirm(confirmMsg[$scope.selectedLanguage.value]).then(function () {
            $category.delete(cat.Id).then(function () {
                _.remove($scope.categories, {Id: cat.Id});
            });
        });
    };

    $scope.onLangChanged = function () {
        $scope.init();
    };
    $scope.$on('sidebarMenuReady', function () {
        var cid = Utils.getParameterByName("cid");
        $scope.sidebarMenu.setActive(cid);
    });
    $scope.$on('languageChanged', function () { $scope.onLangChanged(); });
    $scope.$on('appInitialized', function () { $scope.init(); });
});
