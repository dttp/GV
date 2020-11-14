angular.module('gv.app.services')
    .factory('$contact', function ($xhttp) {
        var service = {
            sendMessage: function (contactForm) {
                return $xhttp.post(WEBAPI_ENDPOINT + '/api/contact/sendmessage', contactForm);
            }
        };
        return service;
    });