angular.module('gv.app.services')
    .factory('$article', function ($xhttp) {
        var service = {
            getById: function (id, lang) {
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/article/getById?id=' + id+ '&lang=' + lang);
            },
            getByCategory: function (catId, lang, createNew, detail, startIndex, pageSize, sortBy, sortAsc, recursive) {
                if (!createNew) createNew = false;
                if (!sortAsc) sortAsc = false;
                if (!detail) detail = false;
                if (!startIndex) startIndex = 0;
                if (!pageSize) pageSize = 100;
                if (!sortBy) sortBy = 'LastModifiedDate';
                if (!recursive) recursive = false;
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/article/getByCategory?catId=' + catId + '&lang=' + lang + '&createNew=' + createNew + '&detail=' + detail + '&startIndex=' + startIndex + '&pageSize=' + pageSize + '&sortBy=' + sortBy + '&sortAsc=' + sortAsc + '&recursive=' + recursive);
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
            },
            getBreadcrumb: function (articleId, lang) {
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/article/getBreadcrumb?articleId=' + articleId + '&lang=' + lang);
            },
            search: function(keyword, lang, startIndex, pageSize) {
                if (!startIndex) startIndex = 0;
                if (!pageSize) pageSize = 20;
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/article/search?keyword=' + encodeURIComponent(keyword) + '&lang=' + lang +  '&startIndex=' + startIndex + '&pageSize=' + pageSize);
            }
        };
        return service;
    });