var categoryListModule = angular.module('gv.app.category.list');
categoryListModule.controller('categoryCtrl', function ($scope, $category, $modal, $uibModal, $q) {
    
    $scope.categories = [];

    $scope.init = function () {
        $category.getCategories(null, $scope.selectedLanguage.value).then(function (response) {
            $scope.categories = response.data;
        });
    };

    function showCategoryModal(categories) {
        var modal = $uibModal.open({
            templateUrl: '/app/components/category/dialog/category.modal.html',
            controller: 'categoryModalCtrl',
            backdrop: 'static',
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
                $scope.sidebarMenu.refreshCategoryList();
            });
        });
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
                    $scope.sidebarMenu.refreshCategoryList();
                });
            });
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

    $scope.$on('languageChanged', function () { $scope.onLangChanged(); });
    $scope.$on('appInitialized', function () { $scope.init(); });
});
