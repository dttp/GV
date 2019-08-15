var module = angular.module('authInterceptor', ['ngStorage']);
module.factory('authInterceptorService', function($q, $localStorage) {
    var authInterceptorServiceFactory = {};

    var _request = function(config) {

        config.headers = config.headers || {};

        var authData = $localStorage.authData;
        if (authData) {
            config.headers.Authorization = 'Basic ' + authData;
        }

        return config;
    };

    var _responseError = function(rejection) {
        if (rejection.status === 401) {
            location.href = '/login';
        }
        return $q.reject(rejection);
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
});