angular.module('gv.app.core', []);
angular.module('gv.app.services', []);
/* Dashboard module */
angular.module('gv.app.dashboard', []);

/* gallery module */
angular.module('gv.app.gallery', []);
/* article module */
angular.module('gv.app.article.detail', []);
angular.module('gv.app.article', ['gv.app.article.detail']);

/* category module */
angular.module('gv.app.category.share', []);
angular.module('gv.app.category.list', ['gv.app.category.share']);
angular.module('gv.app.category.detail', ['gv.app.category.share']);
angular.module('gv.app.category', ['gv.app.category.list', 'gv.app.category.detail']);

/* setting module */
var app = angular.module('gv.app',
    [
        'ngHttp',        
        'authService',
        'authInterceptor',        
        'ngStorage',
        'ngAlert',        
        'gv.app.services',        
        'angular-loading-bar',
        'toastr',
        'gv.app.core',
        'gv.app.dashboard',
        'gv.app.category',
        'gv.app.article',
        'gv.app.gallery',
    ]);
app.config(function (cfpLoadingBarProvider, $httpProvider, toastrConfig) {
    $httpProvider.interceptors.push('authInterceptorService');
    cfpLoadingBarProvider.spinnerTemplate =
        '<div class="blockUI blockOverlay" style="z-index: 1000; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; opacity: 0.05; cursor: wait; position: fixed; background-color: rgb(85, 85, 85);"></div><div class="blockUI blockMsg blockPage" style="z-index: 1011; position: fixed; padding: 0px; margin: 0px; width: 30%; top: 40%; left: 35%; text-align: center; color: rgb(0, 0, 0); border: 0px; cursor: wait;"><div class="loading-message loading-message-boxed"><img src="/app/assets/images/loading.gif" style="width:48px" align=""><span>&nbsp;&nbsp;LOADING...</span></div></div>';
    angular.extend(toastrConfig,
        {
            autoDismiss: false,
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-top-center',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            closeButton: true,
            timeOut: 2500,
            showDuration: 300,
            hideDuration: 1000,
            showMethod: "fadeIn",
            hideMethod: "fadeOut"            
        });
});

app.run(function ($rootScope, alertSvc, $localStorage) {
    $rootScope.alertSvc = alertSvc;
    $rootScope.availableLanguages = [
        {
            value: 'en',
            name: 'English',
            icon: 'flag-icon flag-icon-us'
        },
        {
            value: 'vn',
            name: 'Tiếng Việt',
            icon: 'flag-icon flag-icon-vn'
        }];
    
    $rootScope.selectLanguage = function (lang) {
        $rootScope.selectedLanguage = lang;
        $localStorage.selectedLanguage = lang;
        $rootScope.$broadcast('languageChanged');
    };

    $rootScope.currentUser = {
        Name: 'Admin'
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
        
        $rootScope.selectedLanguage = $localStorage.selectedLanguage;
        if (!$rootScope.selectedLanguage) $rootScope.selectedLanguage = $rootScope.availableLanguages[0];

        if (!$localStorage.authData) {
            location.href = '/login';
        } else {
            setTimeout(function () {
                $rootScope.$broadcast('appInitialized');
                $rootScope.$apply();
            }, 100);
        }
    };


    $rootScope.init();

    
});
