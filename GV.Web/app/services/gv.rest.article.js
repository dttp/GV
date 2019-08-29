angular.module('gv.app.services')
    .factory('$article', function ($xhttp) {
        var service = {
            getById: function (id, lang) {
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/article/getById?id=' + id+ '&lang=' + lang);
            },
            getByCategory: function (catId, lang) {
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/article/getByCategory?catId=' + catId + '&lang=' + lang);
            },
            getAllByCategory: function (catId, lang) {
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/article/getAllByCategory?catId=' + catId + '&lang=' + lang);
            },
            delete: function (id) {
                return $xhttp.delete(WEBAPI_ENDPOINT + '/api/article/delete?id=' + id);
            },
            deleteByCategory: function (catId) {
                return $xhttp.delete(WEBAPI_ENDPOINT + '/api/article/deleteByCategory?catId=' + catId);
            },
            create: function (articles) {
                return $xhttp.post(WEBAPI_ENDPOINT + '/api/article/create', articles);
            },
            update: function (articles) {
                return $xhttp.post(WEBAPI_ENDPOINT + '/api/article/update', articles);
            }
        };
        return service;
    });