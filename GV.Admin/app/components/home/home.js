var module = angular.module('gv.app.dashboard');
module.controller('dashboardCtrl', function ($scope, $article) {
    $scope.features = [
        {
            title: 'Home Page Info',
            description: 'Manage information displayy in GV home page',
            icon: 'icon-grid font-red-sunglo theme-font',
            url: '/setting'
        },
        {
            title: 'Image gallery',
            description: 'Manage images used in GV',
            icon: 'icon-picture font-yellow theme-font',
            url: '/gallery'
        },
        {
            title: 'Services Category',
            description: 'Manage services category in GV',
            icon: 'icon-grid font-green theme-font',
            url: '/category'
        },
        {
            id: 'about',
            title: 'About Info',
            description: 'Edit GV about info',
            icon: 'icon-call-in font-blue theme-font',
            url: '/'
        },
        {
            id: 'contact',
            title: 'Contact Info',
            description: 'Edit GV contact info',
            icon: 'icon-call-in font-blue theme-font',
            url: '/'
        }];

    function editContact () {
        $article.getByCategory('sys-contact', $scope.selectedLanguage.value).then(function (response) {
            var a = response.data;
            if (a.length > 0) {
                location.href = '/article?id=' + a[0].Id;
            } else {
                var contactArtiles = [
                    {
                        CategoryId: 'sys-contact',
                        Name: 'Contact Info',
                        Language: 'en',
                        Description: '',
                        Data: '',
                        Visible: true,
                        Thumbnail: ''
                    },
                    {
                        CategoryId: 'sys-contact',
                        Name: 'Contact Info',
                        Language: 'vn',
                        Description: '',
                        Data: '',
                        Visible: true,
                        Thumbnail: ''
                    }];
                $article.create(contactArtiles).then(function (response) {
                    location.href = '/article?id=' + response.data[0].Id;
                });
            }
        });
    }

    function editAbout () {
        $article.getByCategory('sys-about', $scope.selectedLanguage.value).then(function (response) {
            var a = response.data;
            if (a.length > 0) {
                location.href = '/article?id=' + a[0].Id;
            } else {
                var contactArtiles = [
                    {
                        CategoryId: 'sys-about',
                        Name: 'About Info',
                        Language: 'en',
                        Description: '',
                        Data: '',
                        Visible: true,
                        Thumbnail: ''
                    },
                    {
                        CategoryId: 'sys-about',
                        Name: 'About Info',
                        Language: 'vn',
                        Description: '',
                        Data: '',
                        Visible: true,
                        Thumbnail: ''
                    }];
                $article.create(contactArtiles).then(function (response) {
                    location.href = '/article?id=' + response.data[0].Id;
                });
            }
        });
    }

    $scope.onFeatureClick = function (f) {
        if (!f.id) location.href = f.url;
        else {
            if (f.id === 'contact') editContact();
            if (f.id === 'about') editAbout();
        }
    };

    $scope.$on('appInitialized', function () { $scope.init(); });
});