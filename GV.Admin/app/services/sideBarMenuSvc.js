var module = angular.module('gv.app.services');
module.factory('$sidebarMenu', function ($category, $rootScope, $article) {

    var sidebarMenu = null;

    var categoryIconMapping = {
        'cat_0_services': 'la la-bar-chart',
        'cat_1_news': 'flaticon2-menu-4',
        'cat_2_regulation': 'la la-balance-scale'
    };

    function refreshCategoriesList(items) {
        $category.getSidebarCategories($rootScope.selectedLanguage.value).then(function (response) {
            if (response.data.length > 0) {

                var categories = response.data;
                _.each(categories, function (c) {

                    var item = {
                        Id: c.Id,
                        Name: c.Name,
                        Type: "MenuItemList",
                        Url: '/category?cid=' + c.Id,
                        Icon: categoryIconMapping[c.Id],
                        Items: [],
                        Selected: false
                    };


                    _.each(c.Items, function (subCat) {
                        var subItem = {
                            Id: subCat.Id,
                            Name: subCat.Name,
                            Type: "MenuItemList",
                            Url: '/category/detail?cid=' + subCat.Id,
                            Icon: categoryIconMapping[subCat.Id],
                            Items: [],
                            Selected: false
                        };
                        item.Items.push(subItem);
                    });

                    items.push(item);
                });
            }
            $rootScope.$broadcast('sidebarMenuReady');
        });
    }

    function getSidebarMenu() {
        var items = [
            {
                Id: "sb-dashboard",
                Name: "Dashboard",
                Type: "MenuItem",
                Url: "/",
                Icon: "flaticon-home",
                Items: [],
                Selected: false
            },
            {
                Id: "sb-file-section",
                Name: "File",
                Type: "Section",
                Url: "",
                Icon: "",
                Items: [],
                Selected: false
            },
            {
                Id: "sb-filemanager",
                Name: "File Manager",
                Type: "MenuItem",
                Url: "/filemanager",
                Icon: "flaticon-layer",
                Items: [],
                Selected: false
            },
            {
                Id: "sb-category-section",
                Name: "Category",
                Type: "Section",
                Url: "",
                Icon: "",
                Items: [],
                Selected: false
            }
        ];

        refreshCategoriesList(items);
        return items;
    }

    function SidebarMenu() {
        var self = this;
        self.items = [];

        self.onItemClick = function (item) {
            if (_.startsWith(item.Id, 'cat_svc_')) {
                $article.getByCategory(item.Id, $rootScope.selectedLanguage.value, true, false).then(function (response) {
                    var article = response.data.Items[0];
                    location.href = '/article?id=' + article.Id;
                });
            } else {
                location.href = item.Url;
            }
        };

        self.initialize = function () {

            /* getting items */
            self.items = getSidebarMenu();
        };

        self.setActive = function (id) {
            _.each(self.items, function (item) {
                item.Selected = item.Id === id;

                _.each(item.Items, function (subItem) {
                    subItem.Selected = subItem.Id == id;
                    if (subItem.Selected) item.Selected = true;
                });
            });            
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