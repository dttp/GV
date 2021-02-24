var module = angular.module('gv.app.services');
module.factory('$sidebarMenu', function ($category, $rootScope, $q, $article) {

    var locale = {
        sbHome: {
            en: 'Home',
            vn: 'Trang chủ'
        },
        sbAbout: {
            en: 'About us',
            vn: 'Về chúng tôi'
        },
        sbRegisterProduct: {
            en: 'Register',
            vn: 'Đăng ký'
        },
        sbContact: {
            en: 'Contact us',
            vn: 'Liên hệ'
        }
    };

    var sidebarMenu = null;

    var categoryIconMapping = {
        'cat_0_services': 'fa fa-bar-chart',
        'cat_1_regulation': 'fa fa-balance-scale'
    };

    function getSubItemsForCat(c) {
        var defer = $q.defer();

        var item = {
            Id: c.Id,
            Name: c.Name,
            Type: "MenuItemList",
            Url: c.Id === 'cat_0_services' ? '/services' : '/regulation',
            Icon: categoryIconMapping[c.Id],
            Items: [],
            Selected: false
        };

        if (!item.Icon) item.Icon = 'fa fa-circle small';

        if (c.Id === 'cat_0_services') {
            var defers = _.map(c.Items, function(subCat) {
                return $article.getByCategory(subCat.Id, $rootScope.selectedLanguage.value, true, false);
            });

            $q.all(defers).then(function(responses) {
                for (var idx = 0; idx < c.Items.length; idx++) {
                    var subCat = c.Items[idx];
                    var article = responses[idx].data.Items[0];

                    var subItem = {
                        Id: subCat.Id,
                        Name: subCat.Name,
                        Type: "MenuItemList",
                        Url: '/article/'+ Utils.normalizeUrl(article),
                        Icon: categoryIconMapping[subCat.Id],
                        Items: [],
                        Selected: false
                    };
                    if (!subItem.Icon) subItem.Icon = 'fa fa-circle small';
                    item.Items.push(subItem);
                }
                console.log('get subitem for services. done.');
                defer.resolve(item);
            });
        } else {
            item.Items = _.map(c.Items, function (subCat) {
                var subItem = {
                    Id: subCat.Id,
                    Name: subCat.Name,
                    Type: "MenuItemList",
                    Url: '/category/'+ Utils.normalizeUrl(subCat),
                    Icon: categoryIconMapping[subCat.Id],
                    Items: [],
                    Selected: false
                };
                if (!subItem.Icon) subItem.Icon = 'fa fa-circle small';
                return subItem;
            });
            console.log('get subitem for news done');
            setTimeout(function() {
                defer.resolve(item);
            },0);
        }

        return defer.promise;
    }

    function refreshCategoriesList() {
        var defer = $q.defer();
        $category.getSidebarCategories($rootScope.selectedLanguage.value).then(function (response) {
            if (response.data.length > 0) {

                var categories = response.data;
                console.log('get category done');
                var catDefers = [];
                _.each(categories,
                    function(c) {
                        catDefers.push(getSubItemsForCat(c));
                    });

                $q.all(catDefers).then(function(catItems) {
                    defer.resolve(catItems);
                });
            }
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
                Url: "/about",
                Icon: "icon-speech",
                Items: [],
                Selected: false
            },
            {
                Id: 'sbRegisterProduct',
                Name: 'Register',
                Type: 'MenuItem',
                Url: '/product/register',
                Icon: 'icon-note',
                Items: [],
                Selected: false
            },
            {
                Id: "sbContact",
                Name: "Contact Us",
                Type: "MenuItem",
                Url: "/contact",
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

        self.initialize = function () {

            /* getting items */
            self.items = getSidebarMenu();
        };

        self.setActive = function (id) {
            _.each(self.items, function (item) {
                item.Selected = item.Id === id;

                _.each(item.Items, function (subItem) {
                    subItem.Selected = subItem.Id === id;
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