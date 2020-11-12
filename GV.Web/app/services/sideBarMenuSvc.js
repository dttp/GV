var module = angular.module('gv.app.services');
module.factory('$sidebarMenu', function ($category, $rootScope, $q) {

    var locale = {
        sbHome: {
            en: 'Home',
            vn: 'Trang chủ'
        },
        sbAbout: {
            en: 'About us',
            vn: 'Về chúng tôi'
        },
        sbContact: {
            en: 'Contact us',
            vn: 'Liên hệ'
        }
    };

    var sidebarMenu = null;

    var categoryIconMapping = {
        'cat_0_services': 'icon-bar-chart',
        'cat_1_news': 'icon-grid',
        'cat_2_regulation': 'fa fa-balance-scale'
    };

    function refreshCategoriesList() {
        var defer = $q.defer();
        var items = [];
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
            defer.resolve(items);            
        });

        return defer.promise;
    }

    function getSidebarMenu() {
        var items = [
            {
                Id: "sbHome",
                Name: "Home",
                Type: "MenuItem",
                Url: "/",
                Icon: "icon-home",
                Items: [],
                Selected: false
            },
            {
                Id: "sbAbout",
                Name: "About Us",
                Type: "MenuItem",
                Url: "/aboutus",
                Icon: "icon-speech",
                Items: [],
                Selected: false
            },
            {
                Id: "sbContact",
                Name: "Contact Us",
                Type: "MenuItem",
                Url: "",
                Icon: "icon-envelope",
                Items: [],
                Selected: false
            }
        ];

        _.each(items, function (item) {
            item.Name = locale[item.Id][$rootScope.selectedLanguage.value];
        });

        refreshCategoriesList().then(function (catItems) {
            var startIndex = 2;
            _.each(catItems, function (c) {
                items.splice(startIndex,0, c);
                startIndex++;
            });
            
            $rootScope.$broadcast('sidebarMenuReady');
        });;
        return items;
    }

    function SidebarMenu() {
        var self = this;
        self.items = [];

        self.onItemClick = function (item) {
            location.href = item.Url;
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