angular.module('authService',
    [
        'ngStorage'
    ])
    .factory('authService', function ($http, $q, $localStorage) {

        var _logout = function () {
            delete $localStorage.authData;
        };

        var _login = function (username, password) {
            var defer = $q.defer();
            var data = {
                UserName: username,
                Password: Base64.encode(password)
            };
            var url = WEBAPI_ENDPOINT + '/api/user/login';
            $http.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (successResponse) {
                var token = successResponse.data;

                $localStorage.authData = token;

                defer.resolve(successResponse);
            }, function (errorResponse) {
                    _logout();
                defer.reject(errorResponse);
            });

            return defer.promise;
        };

        var authService = {
            login: _login,
            logout: _logout
        };

        return authService;
    });
