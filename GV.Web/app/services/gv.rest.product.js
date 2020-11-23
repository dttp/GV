angular.module('gv.app.services')
    .factory('$product', function ($xhttp) {
        var service = {
            getById: function (id) {
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/product/getbyId?id=' + id);
            },
            create: function (product) {
                return $xhttp.post(WEBAPI_ENDPOINT + '/api/product/insert', product);
            },
            filter: function(startIndex, pageSize, sortBy, sortAsc) {
                var url = WEBAPI_ENDPOINT + '/api/product/filter?startIndex=' + startIndex + '&pageSize=' + pageSize;
                if (!sortBy) {
                    url += '&sortBy=' + sortBy + '&sortAsc=' + sortAsc;
                };

                return $xhttp.get(url);
            }
        };
        return service;
    });