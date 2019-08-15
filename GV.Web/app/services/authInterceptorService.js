var module = angular.module('authInterceptor', []);
module.factory('authInterceptorService', function() {
    var authInterceptorServiceFactory = {};

    var _request = function(config) {

        config.headers = config.headers || {};
        config.headers["X-GV-Context"] = "web";
        return config;
    };

    authInterceptorServiceFactory.request = _request;

    return authInterceptorServiceFactory;
});