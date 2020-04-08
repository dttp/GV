var module = angular.module('gv.app.services');
module.factory('$sidebarMenu', function ($category, $rootScope) {

    var sidebarMenu = null;

    var dashboardMenuItem = {
        "Id": "sb-dashboard",
        "Name": "Home",
        "Type": "MenuItem",
        "Url": "/",
        "Icon": "icon-home",
        "SelectedPages": [
            '/'
        ]
    };
    var galleryMenuItem = {
        "Id": "sb-gallery",
        "Name": "File Manager",
        "Type": "MenuItem",
        "Url": "/fileManager",
        "Icon": "icon-picture",
        "SelectedPages": [
            '/filemanager'
        ]
    };

    function refreshRootCategoryList(items) {
        $category.getCategories(null, $rootScope.selectedLanguage.value).then(function (response) {
            if (response.data.length > 0) {
                if (!_.find(items, { Id: 'sb-cat-heading' })) {
                    items.push({
                        "Id": "sb-cat-heading",
                        "Name":"Category List",
                        "Type":"Heading"
                    });
                }
                _.each(response.data, function (cat) {
                    items.push({
                        Id: 'cat-' + cat.Id,
                        Name: cat.Name,
                        Url: '/category/detail?id=' + cat.Id,
                        Type: 'MenuItem',
                        Icon: 'icon-grid',
                        SelectedPages: []
                    });
                });
            }
        });
    }

    function getSidebarMenu() {
        var items = [];
        items.push(dashboardMenuItem);
        items.push(galleryMenuItem);
        refreshRootCategoryList(items);
        return items;
    }

    function SidebarMenu() {
        var self = this;
        self.items = [];

        self.onItemClick = function (item) {
            location.href = item.Url;
        };

        self.refreshCategoryList = function () {
            _.remove(self.items, function (item) {
                return _.startsWith(item.Id, 'cat-');
            });
            refreshRootCategoryList(self.items);
        };

        self.initialize = function () {

            /* getting items */
            self.items = getSidebarMenu();
        };
    }

    function createSidebarMenu() {
        if (!sidebarMenu) sidebarMenu = new SidebarMenu();
        sidebarMenu.initialize();
        return sidebarMenu;
    }

    var service = {
        create: createSidebarMenu
    };

    return service;
});