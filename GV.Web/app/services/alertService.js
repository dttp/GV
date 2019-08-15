angular.module('ngAlert', ['toastr'])
    .factory('alertSvc', ['toastr', function (toastr) {
        var service = {
            addError: function(msg) {
                toastr.error(msg, 'Error', {
                    timeOut: 0,
                    extendedTimeOut: 0
                });
            },
        
            addInfo: function(msg) {
                toastr.info(msg, 'Info');
            },

            addSuccess: function (msg) {
                toastr.success(msg, 'Success');
            }
        };
        return service;
    }])    
;