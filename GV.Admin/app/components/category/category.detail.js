var categoryDetailModule = angular.module('gv.app.category.detail', ['ui.bootstrap', 'gv.modal']);
categoryDetailModule.controller('categoryDetailCtrl', function ($scope, $category, $modal, $uibModal, $q, $article) {
    $scope.category = {};
    $scope.items = [];

    function showCategoryModal(categories) {
        var modal = $uibModal.open({
            templateUrl: '/app/components/category/dialog/category.modal.html',
            controller: 'categoryModalCtrl',
            backdrop: 'static',
            resolve: {
                categories: function () {return categories;},
                parentId: function () { return $scope.category.Id; }
            }
        });

        return modal.result;
    }

    $scope.createCategory = function () {
        showCategoryModal().then(function (result) {
            $category.create(result).then(function (response) {
                $scope.alertSvc.addSuccess('Create category successful');
                $scope.init();
            });
        });
    };

    $scope.createArticle = function () {
        location.href = '/article?catid=' + $scope.category.Id;
    };

    function editArticle(article) {
        location.href= '/article?id=' + article.Id;
    }

    function editCategory(cat) {
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
            });
        });
    }

    $scope.edit = function (item) {
        if (item.type === 'Category') editCategory(item.data);   
        if (item.type === 'Article') editArticle(item.data);
    };

    $scope.delete = function (item) {
        var msg = {
            'en': 'Are you sure you want to delete this?',
            'vn': 'Bạn có chắc chắn muốn xóa item này không?'
        };
        var successMsg = {
            'en': 'Delete successfully',
            'vn': 'Xóa thành công'
        };

        $modal.showConfirm(msg[$scope.selectedLanguage.value]).then(function () {
            var promise = item.type === 'Category' 
                            ? $category.delete(item.data.Id)
                            : $article.delete(item.data.Id);
            promise.then(function () {
                $scope.alertSvc.addSuccess(successMsg[$scope.selectedLanguage.value]);
                _.remove($scope.items, x => x.data.Id === item.data.Id);
            });
        });
    };

    $scope.onLangChanged = function () {
        $scope.init();
    };

    $scope.init = function () {
        var id = Utils.getParameterByName('cid');
        $category.getById(id, $scope.selectedLanguage.value).then(function (response) {
            $scope.category = response.data;
        });

        var items = [];
        var promises = [];
        //promises.push($category.getCategories(id, $scope.selectedLanguage.value));
        promises.push($article.getByCategory(id, $scope.selectedLanguage.value));
        
        $q.all(promises).then(function (responses) {
            //_.each(responses[0].data, function (cat) {
            //    var item = {
            //        type: 'Category',
            //        data: cat
            //    };
            //    items.push(item);
            //});
            _.each(responses[0].data.Items, function (article) {
                var item = {
                    type: 'Article',
                    data: article
                };
                items.push(item);
            });
            $scope.items = _.orderBy(items, ['type', 'data.Name'], ['desc', 'asc']);
        });
    };

    $scope.$on('languageChanged', function () { $scope.onLangChanged(); });
    $scope.$on('appInitialized', function () { $scope.init(); });
});
