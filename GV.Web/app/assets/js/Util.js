var Utils = {
    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", 'i'),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    getEmailPattern: function () {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    },

    uniqueId: function (idStrLen) {
        if (!idStrLen) {
            idStrLen = 20;
        }
        var idStr = (Math.floor((Math.random() * 25)) + 10).toString(36) + "_";
        // add a timestamp in milliseconds (base 36 again) as the base
        idStr += (new Date()).getTime().toString(36) + "_";
        // similar to above, complete the Id using random, alphanumeric characters
        do {
            idStr += (Math.floor((Math.random() * 35))).toString(36);
        } while (idStr.length < idStrLen);

        return (idStr);
    },
    normalizeUrl: function(obj) {
        var regexPattern = /[\s.,_]/g;
        var url = obj.Name.replaceAll(regexPattern, '-').toLowerCase() + '__' + obj.Id;
        return url;
    },

    getIdFromUrl: function() {
        var idx = location.pathname.indexOf('__');
        var id = location.pathname.substring(idx + 2);
        return id;
    }
}