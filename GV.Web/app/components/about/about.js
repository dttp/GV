angular.module('gv.app.about')
    .controller('aboutCtrl', function ($scope) {
        
        $scope.locale = {
            hero: {
                title: {
                    en: 'Welcome to <br> GV Company Ltd',
                    vn: 'Chào mừng bạn đến<br>CT TNHH GV'
                },
                small: {
                    en: 'Your success is Our Value',
                    vn: 'Thành công của bạn là Giá trị của chúng tôi'
                },
                introduce: {
                    en: 'We understand that going into Vietnamese market of manufacturing and importing electrical, electronic and information technology requires a lot of challenges. At GV Co.ltd., we are making constant efforts to support clients passing the product compliance assessment conducted by Government Authorities in a simple, fast and transparent way. We have more than a decade of experience in consulting, in testing, certifying and update regulatory for the above telecommunications and Information technology companies around the world. We have a strong belief that our experts will make your business easier.',
                    vn: 'Chúng tôi hiểu rằng sản xuất và nhập khẩu thiết bị điện, điện tử và công nghệ thông tin vào thị trường Việt Nam đòi hỏi rất nhiều thách thức. Chúng tôi đang nỗ lực không ngừng để giúp hoàn thiện sản phẩm của quý khách hàng trong quá trình đánh giá phù hợp của cơ quan Nhà nước một cách đơn giản, nhanh chóng, rõ ràng và minh bạch. Chúng tôi đã có kinh nghiệm hơn 1 thập niên về việc tư vấn thử nghiệm, chứng nhận, công bố hợp quy, đăng ký kiểm tra chất lượng hàng nhập khẩu, tiết kiệm năng lượng, an toàn thông tin, mật mã dân sự cho các công ty viễn thông, công ty công nghệ thông trên toàn thế giới. Vì vậy chúng tôi có niềm tin vững chắc chuyên gia của mình sẽ giúp việc kinh doanh của bạn dễ dàng hơn. '
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
                        vn: 'Chúng tôi cùng nhau nỗ lực và say mê để tạo ra các giải pháp giúp các nhà sản xuất và nhập khẩu điện, điện tử, viễn thông và công nghệ thông tin đưa sản phẩm vào thị trường Việt Nam một cách thuận tiện, nhanh chóng và không tốn kém.'
                    },
                    mission: {
                        en: "Our mission is working together with manufacturers of electrical, electronic, telecommunications and information technology products to demonstrate the product's compatibility with state management agencies to be freely circulated in Vietnam. We work closely with our customers to build a sustainable future.",
                        vn: 'Nhiệm vụ của chúng tôi là cùng với các nhà sản xuất sản phẩm điện, điện tử, viễn thông, công nghệ thông tin chứng minh sản phẩm phù hợp với cơ quan quản lý nhà nước để được lưu hành tự do tại Việt Nam. Chúng tôi hợp tác chặt chẽ với khách hàng để xây dựng một tương lai bền vững.'
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