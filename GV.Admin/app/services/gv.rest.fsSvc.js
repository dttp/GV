angular.module('gv.app.services')
    .factory('$fs', function ($xhttp) {
        var service = {
            getList: function (path) {
                if (!path) path = '';
                return $xhttp.get(WEBAPI_ENDPOINT + '/api/fs/getlist?path='+encodeURIComponent(path));
            },
            createFolder: function (path, name) {
                if (!path) path = '';
                return $xhttp.post(WEBAPI_ENDPOINT + '/api/fs/createfolder?path=' + encodeURIComponent(path) + '&name='+ name);
            },
            delete: function (path) {
                return $xhttp.delete(WEBAPI_ENDPOINT + '/api/fs/delete?path=' + encodeURIComponent(path));
            }
        };
        return service;
    });