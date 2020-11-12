angular.module('gv.app.home')
    .controller('homeCtrl', function ($scope) {

        $scope.slickConfig = {
            enabled: true,
            autoplay: true,
            autoplaySpeed: 6500,
            draggable: false,
            method: {},
            fade: true,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,

            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                    animateCSS('#banner-'+ nextSlide, getRandomAnimationName());
                }
            }
        };

        function getRandomAnimationName() {
            var animationList = [
                'zoomIn',
                'fadeIn',
                'fadeInDown',
                'slideInDown',
                'bounceIn',
                'rotateIn',
                'flipInY',
                'lightSpeedIn',
                'rollIn',
                'tada'
                ];
            var idx = Math.floor((Math.random() * 10));
            return animationList[idx];
        }

        function animateCSS(element, animationName, callback) {
            const node = document.querySelector(element);
            node.classList.add('animated', animationName);

            function handleAnimationEnd() {
                node.classList.remove('animated', animationName);
                node.removeEventListener('animationend', handleAnimationEnd);

                if (typeof callback === 'function') callback();
            }

            node.addEventListener('animationend', handleAnimationEnd);
        }

        $scope.dataLoaded = false;

        $scope.labels = {
            'en': {
                sampleTitle: 'Certificate Samples',
                aboutTitle: 'About Us',
                clientTitle: 'Our Clients',
                serviceTitle: 'Service we do',
            },
            'vn': {
                sampleTitle: 'Chứng chỉ mẫu',
                aboutTitle: 'Giới thiệu về GV',
                clientTitle: 'Khách hàng của chúng tôi',
                serviceTitle: 'Dịch vụ của chúng tôi',
            }
        };

        $scope.homePageInfo = null;
        $scope.aboutArticle = null;

        $scope.gotoCategory = function (c) {
            location.href = '/category?id=' + c.Id;
        };

        $scope.init = function () {
            $scope.sidebarMenu.setActive('sbHome');
            $scope.dataLoaded = false;
        };

        $scope.onLangChanged = function () {
            $scope.init();
        };

        $scope.$on('languageChanged', function () { $scope.onLangChanged(); });
        $scope.$on('appInitialized', function () { $scope.init(); });
    });