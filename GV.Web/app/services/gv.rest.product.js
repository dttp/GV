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
            },
            generateProductRequestForm: function(pid, lang) {
                var url = WEBAPI_ENDPOINT + '/api/product/GenerateProductRequestForm?productId=' + pid + '&lang=' + lang;
                return $xhttp.post(url);
            }
        };
        return service;
    });