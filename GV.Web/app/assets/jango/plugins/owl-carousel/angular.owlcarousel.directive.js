angular.module('ngOwlCarousel', [])
    .directive("owlCarousel", function() {
        return {
            restrict: 'EA',
            transclude: false,
            replace: true,
            link: function (scope) {
                scope.initCarousel = function(element) {
                    // provide any default options you want
                    var defaultOptions = {
                    };
                    var customOptions = scope.$eval($(element).attr('data-options'));
                    // combine the two options objects
                    for(var key in customOptions) {
                        defaultOptions[key] = customOptions[key];
                    }
                    // init carousel
                    var curOwl = $(element).data('owlCarousel');
                    if (curOwl) {
                        $(element).trigger('destroy.owl.carousel');
                        console.log('hello');
                        
                    } 
                    $(element).owlCarousel(defaultOptions);
                    scope.cnt++;
                };
            }
        };
    })
    .directive('owlCarouselItem', [function() {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope, element) {
                // wait for the last item in the ng-repeat then call init
                if(scope.$last) {
                    scope.initCarousel(element.parent());
                }
                //scope.$on('languageChanged', function () {
                //    if (scope.$last) {
                //        console.log('try again');
                //        scope.initCarousel(element.parent());
                //    }
                    
                //});
            }
        };
    }]);