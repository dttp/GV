angular.module('gv.app.core', []);
angular.module('gv.app.home', 
    [
        //'ngOwlCarousel', 
        //'ngLightGallery',
        //'slickCarousel'
    ]);
angular.module('gv.app.about', []);
angular.module('gv.app.services', []);
angular.module('gv.app.contact', []);
angular.module('gv.app.article', []);
angular.module('gv.app.category', []);
var gvWebApp = angular.module('gv.app',
    [
        'ngHttp',
        'authInterceptor',
        'ngSanitize',
        'ngAnimate',
        'ngStorage',
        'ngAlert',
        
        'gv.app.services',
        'angular-loading-bar',
        'toastr',
        'gv.app.core',
        'gv.app.home',
        'gv.app.about',
        'gv.app.contact',
        'gv.app.category',
        'gv.app.article'
    ]);
gvWebApp.config(function (cfpLoadingBarProvider, $httpProvider, toastrConfig) {
    $httpProvider.interceptors.push('authInterceptorService');
    cfpLoadingBarProvider.spinnerTemplate =
        '<div class="blockUI blockOverlay" style="z-index: 1000; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; opacity: 0.05; cursor: wait; position: fixed; background-color: rgb(85, 85, 85);"></div><div class="blockUI blockMsg blockPage" style="z-index: 1011; position: fixed; padding: 0px; margin: 0px; width: 30%; top: 40%; left: 35%; text-align: center; color: rgb(0, 0, 0); border: 0px; cursor: wait;"><div class="loading-message loading-message-boxed"><img src="/app/assets/imgs/Spinner-1s-284px.png" style="width:48px" align=""><span>&nbsp;&nbsp;LOADING...</span></div></div>';
    angular.extend(toastrConfig,
        {
            autoDismiss: false,
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-top-center',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            closeButton: true,
            timeOut: 2500
        });
});

gvWebApp.run(function ($rootScope, alertSvc, $localStorage) {
    $rootScope.alertSvc = alertSvc;

    $rootScope.availableLanguages = [
        {
            value: 'en',
            name: 'English',
        },
        {
            value: 'vn',
            name: 'Tiếng Việt',
        }];

    $rootScope.selectedLanguage = $rootScope.availableLanguages[0];

    $rootScope.selectLanguage = function (lang) {
        $rootScope.selectedLanguage = lang;
        $localStorage.lang = lang;
        $rootScope.$broadcast('languageChanged');
    };

    $rootScope.hasError = function (field, errorType) {
        switch (errorType) {
            case 'required':
                return field && field.$dirty && field.$error.required;
            case 'pattern':
                return field && field.$dirty && field.$error.pattern;
            case 'min':
                return field && field.$dirty && field.$error.min;
            case 'max':
                return field && field.$dirty && field.$error.max;
            case 'invalid':
                return field && field.$dirty && field.$invalid;
            default:
                return false;
        }
    };

    $rootScope.init = function () {
        if ($localStorage.lang)
            $rootScope.selectLanguage($localStorage.lang);
        setTimeout(function () {
            $rootScope.$broadcast('appInitialized');
            $rootScope.$apply();
        }, 100);
    };

    $rootScope.init();
});
