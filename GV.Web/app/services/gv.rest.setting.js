angular.module('gv.app.services')
    .factory('$setting', function ($xhttp) {
        var service = {
            getHomePageInfo: function () {
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/setting/gethomepageinfo');
            },
            saveHomePageInfo: function (homepageInfo) {
                return $xhttp.post(WEBAPI_ENDPOINT + '/api/setting/saveHomePageInfo', homepageInfo);
            }
        };
        return service;
    });