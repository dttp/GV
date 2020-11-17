angular.module('gv.app.about')
    .controller('aboutCtrl', function ($scope) {
        
        $scope.locale = {
            hero: {
                title: {
                    en: 'Welcome to <br> GV Company Ltd',
                    vn: ''
                },
                small: {
                    en: 'Your success is Our Value',
                    vn: ''
                },
                introduce: {
                    en: 'We understand that going into Vietnamese market of manufacturing and importing electrical, electronic and information technology requires a lot of challenges. At GV Co.ltd., we are making constant efforts to support clients passing the product compliance assessment conducted by Government Authorities in a simple, fast and transparent way. We have more than a decade of experience in consulting, in testing, certifying and update regulatory for the above telecommunications and Information technology companies around the world. We have a strong belief that our experts will make your business easier.',
                    vn: ''
                }
            },
            section: {
                history: {
                    title: {
                        en: 'History',
                        vn: 'Lịch sử hình thành'
                    }
                },
                visionMission: {
                    title: {
                        en: 'Vision & Mission',
                        vn: 'Tầm nhìn & nhiệm vụ'
                    },
                    vision: {
                        en: 'Together, we work hardly and passionately to create solutions that help manufacturers and importers of electrical, electronic, telecommunications and information technology to bring products into Vietnamese market in a convenient, fast and inexpensive way.',
                        vn: ''
                    },
                    mission: {
                        en: "Our mission is working together with manufacturers of electrical, electronic, telecommunications and information technology products to demonstrate the product's compatibility with state management agencies to be freely circulated in Vietnam. We work closely with our customers to build a sustainable future.",
                        vn: ''
                    }
                },
                coreValue: {
                    title: {
                        en: 'Core value',
                        vn: 'Giá trị cốt lõi'
                    },
                    item: {
                        quality: {
                            en: 'Quality',
                            vn: 'Chất lượng'
                        },
                        efficiency: {
                            en: 'Efficiency',
                            vn: 'Hiệu quả'
                        },
                        humanity: {
                            en: 'Humanity',
                            vn: 'Con người'
                        }
                    }

                }
            }
        };

        $scope.init = function () {
            $scope.sidebarMenu.setActive('sbAbout');
        };

        $scope.$on('languageChanged', function () { $scope.init(); });
        $scope.$on('appInitialized', function () { $scope.init(); });
    });