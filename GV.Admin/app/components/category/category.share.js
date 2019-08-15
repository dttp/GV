var categoryShareModule = angular.module('gv.app.category.share');
categoryShareModule.controller('categoryModalCtrl', function ($scope, $uibModalInstance, categories, parentId) {
    $scope.categories = [];
    $scope.activeTab = $scope.selectedLanguage;
    $scope.setActiveTab = function (lang) {
        $scope.activeTab = lang;
    };

    $scope.labels = {
        categoryName: {
            en: 'Name',
            vn: 'Tên'
        },
        categoryDesc: {
            en: 'Description',
            vn: 'Mô tả'
        },
        namePlaceHolder: {
            en: 'Enter category name here',
            vn: 'Nhập tên category ở đây'
        },
        descPlaceHolder: {
            en: 'Enter description here',
            vn: 'Nhập mô tả ở đây'
        },
        nameErrorRequired: {
            en: 'Category name is required',
            vn: 'Tên category là trường bắt buộc'
        }
    };

    $scope.forms = {};

    $scope.allFormsValid = function () {
        var valid = true;
        _.each($scope.availableLanguages, lang => {
            valid = valid & $scope.forms['categoryForm_' + lang.value].$valid;
        });
        return valid;
    };

    $scope.init = function () {
        if (categories) $scope.categories = _.cloneDeep(categories);
        else {
            _.each($scope.availableLanguages, lang => {
                $scope.categories.push({
                    Name: '',
                    Description: '',
                    ParentId: parentId,
                    Lang: lang.value
                });
            });
        }
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.categories);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.init();
});