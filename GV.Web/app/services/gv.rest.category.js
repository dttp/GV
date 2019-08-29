angular.module('gv.app.services')
    .factory('$category', function ($xhttp) {
        var service = {
            getById: function (id, lang) {
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/category/getById?id=' + id+ '&lang=' + lang);
            },
            getCategories: function (parentId, lang) {
                if (!parentId) parentId = '';
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/category/getCategories?parentId=' + parentId + '&lang=' + lang);
            },
            getRootCategories: function (currentCatId, lang) {
                if (!currentCatId) currentCatId = '';
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/category/getRootCategories?currentCatId=' + currentCatId + '&lang=' + lang);
            },
            delete: function (catId) {
                return $xhttp.delete(WEBAPI_ENDPOINT + '/api/category/delete?catId=' + catId);
            },
            create: function (categories) {
                return $xhttp.post(WEBAPI_ENDPOINT + '/api/category/create', categories);
            },
            update: function (categories) {
                return $xhttp.post(WEBAPI_ENDPOINT + '/api/category/update', categories);
            }
        };
        return service;
    });