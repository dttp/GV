﻿var articleModule = angular.module('gv.app.article.detail', ['gv.modal', 'ckeditor']);

articleModule.controller('articleDetailCtrl', function ($scope, $article, $modal, $q) {
    $scope.articles = [];
    $scope.mode = 'Create';

    $scope.ckEditorOptions = {
        language: 'en',
        allowedContent: true,
        entities: false
    };

    $scope.labels = {
        aName: {
            en: 'Name',
            vn: 'Tên bài viết'
        },
        aThumbnail: {
            en: 'Thumbnail',
            vn: 'Ảnh minh họa'
        },
        aDesc: {
            en: 'Description',
            vn: 'Mô tả'
        },
        aData: {
            en: 'Content',
            vn: 'Nội dung'
        },
        aNamePlaceHolder: {
            en: 'Enter article name here',
            vn: 'Nhập tên bài viết ở đây'
        },
        aDescPlaceHolder: {
            en: 'Enter description here',
            vn: 'Nhập mô tả cho bài viết ở đây'
        },
        aNameErrorRequired: {
            en: 'Article name is required',
            vn: 'Tên bài viết là trường bắt buộc'
        },
        buttonSubmit: {
            en: 'Submit',
            vn: 'Lưu lại'
        },
        buttonCancel: {
            en: 'Cancel',
            vn: 'Bỏ qua'
        },
    };

    $scope.forms = [];

    $scope.activeTab = $scope.selectedLanguage;
    $scope.setActiveTab = function (lang) {
        $scope.activeTab = lang;
    };

    $scope.selectThumbnail = function () {
        $modal.selectImages().then(function (response) {
            _.each($scope.articles, function (a) {
                a.Thumbnail = response[0].Url;
            }); 
        });
    };

    $scope.removeThumbnail = function () {
        _.each($scope.articles, function (a) {
            a.Thumbnail = '';
        });

        $scope.alertSvc.addSuccess('Thumbnail has been removed');
    };

    $scope.submit = function () {
        console.log($scope.articles);
        var promise = $scope.mode === 'Create'
                        ? $article.create($scope.articles) 
                        : $article.update($scope.articles);
        promise.then(function () {
            $scope.alertSvc.addSuccess($scope.mode + ' article successfully');
            $scope.cancel();
        });
    };

    $scope.cancel = function () {
        var catId = $scope.articles[0].CategoryId;
        if (_.startsWith(catId, 'cat_svc_'))
            location.href = '/category?cid=cat_0_services';
        else 
            location.href = '/category/detail?cid=' + catId;
    };

    $scope.onLangChanged = function () {
        $scope.init();
    };

    $scope.getArticle = function () {
        return _.find($scope.articles, function (a) { return a.Language.toLowerCase() === $scope.selectedLanguage.value;});
    }

    $scope.init = function () {
        var id = Utils.getParameterByName('id');
        var catId = Utils.getParameterByName('catid');
        if (id) $scope.mode = 'Update';
        
        $scope.articles = [];
        if ($scope.mode === 'Update') {
            var promises = [];
            _.each($scope.availableLanguages, function (lang) {
                promises.push($article.getById(id, lang.value));
            });
            $q.all(promises).then(function (responses) {
                _.each(responses, function (res) {
                    $scope.articles.push(res.data);
                });

                updateSidebarActiveItem();
            });
        } else {
            _.each($scope.availableLanguages, function (lang) {
                $scope.articles.push({
                    Id: Utils.uniqueId(),
                    CategoryId: catId,
                    Language: lang.value,
                    Name: 'New Article',
                    Desccription: '',
                    Data: '',
                    Visible: true,
                    Thumbnail: ''
                });
            });

            updateSidebarActiveItem();
        }
    };

    function updateSidebarActiveItem() {
        if ($scope.articles.length > 0) {
            $scope.sidebarMenu.setActive($scope.articles[0].CategoryId);
        }
    }

    $scope.$on('sidebarMenuReady', function () {
        updateSidebarActiveItem();
    });
    $scope.$on('languageChanged', function () { $scope.onLangChanged(); });
    $scope.$on('appInitialized', function () { $scope.init(); });

});